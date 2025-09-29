import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "jannikjbiFM - Dein Radiosender",
  description: "jannikjbiFM - Der beste Radiosender für Musik, News und Entertainment. Live-Stream, DJ-Shows und mehr.",
  generator: "v0.app",
  keywords: ["Radio", "jannikjbiFM", "Live Stream", "Musik", "DJ", "Entertainment"],
  authors: [{ name: "jannikjbiFM Team" }],
  openGraph: {
    title: "jannikjbiFM - Dein Radiosender",
    description: "Der beste Radiosender für Musik, News und Entertainment",
    type: "website",
    locale: "de_DE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
