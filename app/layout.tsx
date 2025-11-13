import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { NavigationTransitionOverlay } from "@/components/ui/navigation-transition-overlay"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "Personal Test, Inc. - Khám phá phong cách của bạn",
  description: "Khám phá phong cách độc bản của riêng bạn với Personal Test",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <NavigationTransitionOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
