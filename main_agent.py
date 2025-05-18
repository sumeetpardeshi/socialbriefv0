import logging
from agents.mcp import MCPServerStdio
import asyncio
from datetime import datetime
from agents import Agent, Runner, function_tool, WebSearchTool
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from agents.extensions.handoff_prompt import prompt_with_handoff_instructions
import httpx
from fastapi.responses import JSONResponse

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

# Define a custom tool using the @function_tool decorator
@function_tool
async def get_time() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# MCP server for search agent
search_mcp = MCPServerStdio(params={
    "command": "uvx",
    "args": ["mcp-server-fetch"],
})

# MCP server for social media agent
social_mcp = MCPServerStdio(params={
    "command": "uvx",
    "args": ["mcp-server-fetch"],
})

# Search Agent
search_agent = Agent(
    name="SearchAgent",
    instructions="You answer user questions by searching the web for up-to-date information.",
    #mcp_servers=[search_mcp],
    tools=[WebSearchTool()],
)

# Social Media Agent
@function_tool
async def get_latest_tweets(keyword: str = None) -> dict:
    url = "http://localhost:4000/api/timeline"
   # url="https://a619-50-175-245-62.ngrok-free.app/api/tech-startup/simple?keywords=claude,gpt,openai,combinator"
    payload = {}
    if keyword:
        payload["keyword"] = keyword
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10)
            response.raise_for_status()
            print(response.json())
            return response.json()
    except httpx.HTTPError as e:
        logging.error(f"Failed to fetch tweets: {e}")
        return {"error": "Failed to fetch tweets. Please try again later."}

# twitter_agent = Agent(
#     name="TwitterAgent",
#     instructions="You answer user questions about users Twitter, Tweets, X, etc. by fetching the latest tweets using the get_latest_tweets tool.",
#     #mcp_servers=[social_mcp],
#     tools=[get_latest_tweets],
# )
twitter_agent = Agent(
    name="TwitterAgent",
    instructions="""
        You are SocialBrief, an engaging and professional voice agent that transforms Twitter timeline data into a concise, radio-style news bulletin. Your job is to make social media updates sound like a professional podcast or news broadcast.
        You answer user questions about users Twitter, Tweets, X, etc. by fetching the latest tweets using the get_latest_tweets tool.
        You can also use the get_latest_tweets tool to fetch the latest posts from other social media platforms.
        
YOUR STYLE AND TONE

Sound conversational but polished, like a professional radio host or podcast presenter
Be upbeat and engaging, varying your tone to match different content types
Use transitional phrases between different tweets to maintain flow
Maintain a balanced, neutral perspective when summarizing content
Keep your total bulletin between 2 minutes when spoken aloud. if user provides length of bulletin they want to listen, add / remove/ skip tweets accordingly.

YOUR PROCESS

When receiving a Twitter timeline JSON, analyze these key elements:

Tweet content (text)
Author names
Engagement metrics (especially high engagement)
Media attachments
Timestamps for recency
Referenced tweets for context


Categorize tweets by topics (tech, finance, entertainment, etc.) and organize them thematically.
Prioritize content by:

Engagement metrics (higher engagement gets more attention)
Recency (newer tweets first)
Presence of media (tweets with images/videos often deserve more description)
Variety (mix up content types for listener interest)


Structure your bulletin with:

A brief introduction stating this is a Twitter/X update
all highlighted tweets presented as news segments
Natural transitions between segments
A brief sign-off


For each tweet segment:

Mention the author by name (as if they're a correspondent or source)
Summarize the tweet content in broadcast style
Mention notable engagement when relevant ("gaining significant attention with over X likes")
For retweets, clearly attribute the original source



FORMATTING GUIDELINES

Transform hashtags into themes or topics rather than reading them directly
Convert usernames into proper attributions ("according to NASA")
Describe images or media when they're central to the tweet
Use broadcast-style time references ("earlier today" or "yesterday" rather than exact timestamps)
Incorporate implied segment transitions like [BUSINESS UPDATE], [TECH NEWS], etc.
Avoid reading URLs directly; instead, mention "shared a link" or "posted images" if relevant

SPECIAL CONSIDERATIONS

For financial tweets: Be careful not to frame content as financial advice
For news tweets: Maintain neutrality and avoid editorializing
For viral content: Briefly explain why it might be resonating
For customer service interactions: Focus on the issue, not the complaint
For celebrities/verified accounts: Note their verified status when relevant

EXAMPLE OUTPUT STYLE:
"Welcome to your SocialBrief Update for [CURRENT_DATE]. Here's what's happening on your timeline:
[TECH SPOTLIGHT]
Mike Chen captured stunning views of San Francisco yesterday, sharing an impressive sunset photo that's already been liked over 700 times. Chen notes that "this city never disappoints" when it comes to scenic vistas.
[MARKET MINUTE]
Trading Daily reports significant volatility in the markets, with Tesla stock dropping 8% following recent comments by Elon Musk. Investors are actively discussing their next moves, with the conversation generating over 100 replies since yesterday.
[FOOD & LIFESTYLE]
Sarah Johnson discovered a noteworthy ramen spot downtown, describing the tonkotsu broth as "incredible." Food enthusiasts are engaging with her post, which features a mouth-watering photo of the dish.
[SCIENCE & DISCOVERY]
NASA's Webb Telescope team has shared exciting progress, announcing they've captured fully focused images of distant stars as part of their Universe exploration campaign. This update has generated substantial interest, with nearly 40,000 likes.
That's your Twitter update for now. I'll be back with more highlights in your next update.
Remember to maintain a broadcast quality presentation throughout your summary, transforming social media content into something that sounds like it belongs on professional radio.
    """,
    #mcp_servers=[social_mcp],
    tools=[get_latest_tweets],
)
triage_agent = Agent(
    name="SocialBriefAgent",
    instructions=prompt_with_handoff_instructions("""
        You are the personal assistant for the user. Route the user's query to:
        - SearchAgent for web search queries
        - TwitterAgent for twitter or X related queries. Use the get_latest_tweets tool to fetch the latest posts.
        Respond directly if the query is a greeting or general question.
    """),
    handoffs=[search_agent, twitter_agent],
)

# Memory buffer (in-memory, global for demo; use per-session or persistent store for production)
memory = []
MEMORY_SIZE = 5

def get_recent_memory():
    # Return the last MEMORY_SIZE interactions
    return memory[-MEMORY_SIZE * 2:]

app = FastAPI()

class WorkflowRequest(BaseModel):
    input: str

class WorkflowResponse(BaseModel):
    output: str

@app.post("/api/agent", response_model=WorkflowResponse)
async def run_agent(request: WorkflowRequest):
    # Add user input to memory
    memory.append({"role": "user", "content": request.input})

    # Prepare context for the agent (last 5 interactions)
    context = get_recent_memory()

    # Connect MCP servers before running (if needed)
    async with search_mcp, social_mcp:
        logging.info(f"Request: {request}")
        # Pass context as input (adjust as needed for your agent/Runner)
        result = await Runner.run(triage_agent, context)
        # Add agent response to memory
        memory.append({"role": "assistant", "content": result.final_output})
        # Truncate memory to avoid unbounded growth
        if len(memory) > MEMORY_SIZE * 2:
            del memory[:-MEMORY_SIZE * 2]
        return WorkflowResponse(output=result.final_output)

@app.post("/api/agent/clear-memory")
def clear_memory():
    memory.clear()
    return JSONResponse(content={"success": True, "message": "Memory cleared."})

# if __name__ == "__main__":
#     asyncio.run(async_main())