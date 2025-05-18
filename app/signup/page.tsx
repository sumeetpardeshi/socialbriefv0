"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState("")
  const [keywords, setKeywords] = useState("")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would call a server action to create the user
    // For now, we'll just move to the next step for progressive profiling
    setStep(2)
  }

  const handleProfileComplete = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would update the user profile
    // For now, we'll just redirect to the brief page
    window.location.href = "/brief"
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="mx-auto w-full max-w-md glass-card">
        {step === 1 ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>Sign up to get started with SocialBrief</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="glass"
                  />
                </div>
                <Button type="submit" className="w-full relative overflow-hidden group">
                  <span className="relative z-10">Continue with Email</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </form>

              <div className="my-4 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-2 text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 glass">
                  <Github className="h-4 w-4" />
                  Continue with GitHub
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 glass">
                  <Mail className="h-4 w-4" />
                  Continue with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Complete your profile</CardTitle>
              <CardDescription>Help us personalize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileComplete} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g. Technology, Finance, Healthcare"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g. AI, machine learning, data science"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="glass"
                  />
                </div>
                <Button type="submit" className="w-full relative overflow-hidden group">
                  <span className="relative z-10">Complete Setup</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">You can always update these preferences later.</p>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
