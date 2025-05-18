import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mic, Twitter, Globe, Sparkles, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 glass">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg">SocialBrief</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#architecture" className="text-sm font-medium hover:text-primary transition-colors">
              Architecture
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button className="relative overflow-hidden group">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Get briefed on what <span className="gradient-text font-extrabold">matters</span>, instantly
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    SocialBrief lets busy professionals speak, type, or tap once and receive an actionable briefing from
                    Twitter/X, LinkedIn, and the open web.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="w-full relative overflow-hidden group">
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" size="lg" className="w-full glass-card">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full md:h-[450px] rounded-2xl overflow-hidden glass-card p-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl"></div>
                  <Image
                    src="https://pub-d0cf051111ba49ab8137495d3c54d663.r2.dev/socialbrief.png"
                    alt="SocialBrief Dashboard"
                    fill
                    className="object-contain p-4 z-10 relative"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Features
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you <span className="gradient-text">need</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay informed without the information overload
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-xl p-6 glass-card transition-all duration-300 hover:scale-105">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mic className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Voice Input</h3>
                <p className="text-center text-muted-foreground">
                  Speak your query and get a concise briefing read back to you
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl p-6 glass-card transition-all duration-300 hover:scale-105">
                <div className="rounded-full bg-secondary/10 p-3 text-secondary">
                  <Twitter className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Social Media Insights</h3>
                <p className="text-center text-muted-foreground">
                  Get the most relevant content from Twitter/X and LinkedIn
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-xl p-6 glass-card transition-all duration-300 hover:scale-105">
                <div className="rounded-full bg-accent/10 p-3 text-accent">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Web Intelligence</h3>
                <p className="text-center text-muted-foreground">Discover relevant content from across the open web</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />
                    Process
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It <span className="gradient-text">Works</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SocialBrief uses advanced AI to deliver concise, actionable briefings
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background text-xl font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold">Speak or Type</h3>
                <p className="text-muted-foreground">Use voice input or type your query about what you want to know</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary to-accent opacity-70 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background text-xl font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold">AI Processing</h3>
                <p className="text-muted-foreground">
                  Our AI searches Twitter/X, LinkedIn, and the web for relevant content
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-primary opacity-70 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background text-xl font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold">Receive Your Brief</h3>
                <p className="text-muted-foreground">
                  Get a concise, actionable summary read back to you or displayed on screen
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Architecture Section */}
        <section id="architecture" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="flex items-center gap-1">
                    <Code className="h-3.5 w-3.5 text-accent" />
                    Technical
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  System <span className="gradient-text">Architecture</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  How SocialBrief is built to deliver fast, reliable insights
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <div className="glass-card p-4 rounded-xl overflow-hidden">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
                  <Image
                    src="https://pub-d0cf051111ba49ab8137495d3c54d663.r2.dev/socialbrief_architecture.png"
                    alt="SocialBrief Architecture Diagram"
                    fill
                    className="object-contain z-10 p-4"
                  />
                </div>
              </div>

              {/*<div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Frontend</h3>
                  <p className="text-muted-foreground">
                    Built with Next.js and React, providing a responsive and interactive user experience with voice
                    input capabilities.
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">Backend Services</h3>
                  <p className="text-muted-foreground">
                    Serverless functions handle API requests, data processing, and integration with social media
                    platforms and web sources.
                  </p>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">AI Processing</h3>
                  <p className="text-muted-foreground">
                    Advanced language models analyze and summarize content, delivering concise and relevant briefings
                    tailored to your needs.
                  </p>
                </div>
              </div>*/}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to <span className="gradient-text">get started</span>?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up today and start getting concise, actionable briefings
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full relative overflow-hidden group">
                    <span className="relative z-10">Sign Up Now</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="glass">
        <div className="container flex flex-col gap-6 py-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>SocialBrief</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="text-sm text-muted-foreground">© 2025 SocialBrief. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
