import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data for history
const historyItems = [
  {
    id: 1,
    query: "What did Sam Altman tweet today about AI safety?",
    date: "May 17, 2025",
    time: "10:30 AM",
  },
  {
    id: 2,
    query: "Latest funding news for AI startups",
    date: "May 16, 2025",
    time: "2:45 PM",
  },
  {
    id: 3,
    query: "Competitor announcements in the AI space",
    date: "May 15, 2025",
    time: "9:15 AM",
  },
  {
    id: 4,
    query: "Brand mentions on Twitter for our product",
    date: "May 14, 2025",
    time: "4:20 PM",
  },
  {
    id: 5,
    query: "Industry hashtags performance this week",
    date: "May 13, 2025",
    time: "11:05 AM",
  },
]

export default function HistoryPage() {
  return (
    <div className="container flex min-h-screen flex-col py-4 md:py-8">
      <header className="flex items-center justify-between pb-6 sticky top-0 z-50 glass px-4 py-3 rounded-xl mb-4">
        <div className="flex items-center gap-2">
          <Link href="/brief">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Brief History</h1>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Briefs</CardTitle>
              <CardDescription>Your last 20 briefs are shown here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historyItems.map((item, index) => (
                  <div key={item.id}>
                    <Link href={`/brief?id=${item.id}`} className="block">
                      <div className="flex flex-col space-y-2 rounded-lg p-3 transition-all hover:bg-muted/20 hover:scale-[1.01]">
                        <div className="font-medium">{item.query}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {index < historyItems.length - 1 && <Separator className="my-2 opacity-30" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
