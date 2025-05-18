import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SocialBrief - Get concise social media briefings",
  description:
    "SocialBrief lets busy professionals speak, type, or tap once and receive an actionable briefing from Twitter/X, LinkedIn, and the open web.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="socialbrief-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
