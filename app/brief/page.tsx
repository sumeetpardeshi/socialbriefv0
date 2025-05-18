"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mic, MicOff, Send, History, Twitter, Linkedin, Globe, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function BriefPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [briefResult, setBriefResult] = useState<null | {
    summary: string
    sources: Array<{
      type: "twitter" | "linkedin" | "web"
      content: string
      author?: string
      url?: string
    }>
  }>(null)

  const toggleRecording = () => {
    // In a real implementation, this would start/stop recording
    setIsRecording(!isRecording)
    if (isRecording) {
      // Simulate transcription result
      setQuery("What did Sam Altman tweet today about AI safety?")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setBriefResult({
        summary:
          "Sam Altman tweeted about the importance of AI safety today, emphasizing three key points: the need for international cooperation, transparency in AI development, and the role of regulation in ensuring safe deployment.",
        sources: [
          {
            type: "twitter",
            content:
              "AI safety requires global cooperation. We're working with partners worldwide to ensure responsible development and deployment.",
            author: "Sam Altman",
            url: "#",
          },
          {
            type: "twitter",
            content:
              "Transparency is key to AI safety. We're committed to sharing our research and findings with the broader community.",
            author: "Sam Altman",
            url: "#",
          },
          {
            type: "web",
            content:
              "OpenAI CEO Sam Altman testified before Congress today on the importance of AI regulation and safety measures.",
            url: "#",
          },
          {
            type: "linkedin",
            content: "Just published a new article on AI safety frameworks and how we're implementing them at OpenAI.",
            author: "Sam Altman",
            url: "#",
          },
        ],
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container flex min-h-screen flex-col py-4 md:py-8">
      <header className="flex items-center justify-between pb-6 sticky top-0 z-50 glass px-4 py-3 rounded-xl mb-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">SocialBrief</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/history">
            <Button variant="outline" size="sm" className="flex items-center gap-1 glass">
              <History className="h-4 w-4" />
              History
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="What would you like to know about? e.g., 'What did Sam Altman tweet today about AI safety?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-24 flex-1 resize-none glass"
                maxLength={512}
              />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleRecording}
                  className={`h-12 w-12 rounded-full ${isRecording ? "" : "glass"}`}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!query.trim() || isLoading}
                  className="h-12 w-12 rounded-full relative overflow-hidden group"
                >
                  <Send className="h-5 w-5 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
            {isRecording && (
              <div className="flex items-center justify-center rounded-md glass p-2 text-sm">
                <span className="animate-pulse mr-2">●</span> Recording... Speak your query
              </div>
            )}
          </form>

          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-lg animate-pulse"></div>
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent relative"></div>
              </div>
              <p className="text-sm text-muted-foreground">Generating your brief...</p>
            </div>
          )}

          {briefResult && !isLoading && (
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>Your Brief</CardTitle>
                  </div>
                  <CardDescription>Based on your query: "{query}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{briefResult.summary}</p>
                  <Button variant="outline" size="sm" className="mt-4 glass">
                    <Mic className="mr-2 h-4 w-4" />
                    Listen to Summary
                  </Button>
                </CardContent>
              </Card>

              <Tabs defaultValue="all">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Sources</h2>
                  <TabsList className="glass">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="twitter">Twitter</TabsTrigger>
                    <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                    <TabsTrigger value="web">Web</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-4 space-y-4">
                  {briefResult.sources.map((source, index) => (
                    <SourceCard key={index} source={source} />
                  ))}
                </TabsContent>

                <TabsContent value="twitter" className="mt-4 space-y-4">
                  {briefResult.sources
                    .filter((source) => source.type === "twitter")
                    .map((source, index) => (
                      <SourceCard key={index} source={source} />
                    ))}
                </TabsContent>

                <TabsContent value="linkedin" className="mt-4 space-y-4">
                  {briefResult.sources
                    .filter((source) => source.type === "linkedin")
                    .map((source, index) => (
                      <SourceCard key={index} source={source} />
                    ))}
                </TabsContent>

                <TabsContent value="web" className="mt-4 space-y-4">
                  {briefResult.sources
                    .filter((source) => source.type === "web")
                    .map((source, index) => (
                      <SourceCard key={index} source={source} />
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {!isLoading && !briefResult && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-lg"></div>
                <div className="rounded-full glass p-4 relative">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold">Ask for a social media brief</h2>
              <p className="max-w-md text-muted-foreground">
                Speak, type, or tap to get an actionable briefing from Twitter/X, LinkedIn, and the web.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery("What did Sam Altman tweet today?")}
                  className="glass"
                >
                  Sam Altman tweets
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery("Latest AI safety discussions on LinkedIn")}
                  className="glass"
                >
                  AI safety on LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery("Startup funding news this week")}
                  className="glass"
                >
                  Startup funding news
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 glass rounded-xl px-4 py-3">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            20 requests remaining today.{" "}
            <Link href="#" className="text-primary hover:underline">
              Upgrade for more
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

function SourceCard({
  source,
}: {
  source: {
    type: "twitter" | "linkedin" | "web"
    content: string
    author?: string
    url?: string
  }
}) {
  const icons = {
    twitter: <Twitter className="h-4 w-4 text-[#1DA1F2]" />,
    linkedin: <Linkedin className="h-4 w-4 text-[#0A66C2]" />,
    web: <Globe className="h-4 w-4 text-muted-foreground" />,
  }

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-full glass p-2">{icons[source.type]}</div>
          <div className="flex-1">
            <p className="mb-2">{source.content}</p>
            <div className="flex items-center justify-between">
              {source.author && <span className="text-sm font-medium">{source.author}</span>}
              {source.url && (
                <Link href={source.url} className="text-xs text-primary hover:underline">
                  View Source
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
