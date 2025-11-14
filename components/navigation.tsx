"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePreservedParams } from "@/hooks/use-preserved-params"

interface NavigationProps {
  currentPage?: "home" | "test" | "about" | "clients" | "contact"
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { buildUrl } = usePreservedParams()

  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
    document.body.style.removeProperty("overflow")
  }, [isMenuOpen])

  const menuItems = [
    { label: "Home", href: "/", key: "home" },
    { label: "Test", href: "/test", key: "test" },
    { label: "Contact us", href: "/contact", key: "about" },
  ]

  return (
    <nav className="sticky top-0 z-[200] bg-[#f8f7f4] backdrop-blur">
      <div className="mx-auto w-full max-w-7xl border-b-2 border-[#d4cfc0] px-6">
        <div className="relative flex items-center justify-between py-6">
        <div className="hidden items-center gap-8 lg:flex lg:flex-1 cursor-pointer">
          {menuItems.slice(0, 3).map((item) => (
            <Link key={item.key} href={buildUrl(item.href)}>
              {currentPage === item.key ? (
                <Button
                  variant="default"
                  className="rounded-full bg-[#BD9479] px-8 text-base font-normal text-white hover:bg-[#BD9479] cursor-pointer"
                >
                  {item.label}
                </Button>
              ) : (
                <span className="text-base text-[#5B4F47] transition-colors hover:text-[#BD9479]">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        <Link href="/" className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <h1 className="text-2xl font-bold tracking-wide text-[#745E4D] md:text-4xl">PERSONAL TEST, INC.</h1>
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:flex-1 lg:justify-end cursor-pointer">
          {menuItems.slice(3).map((item) => (
            <Link key={item.key} href={buildUrl(item.href)}>
              {currentPage === item.key ? (
                <Button
                  variant="default"
                  className="rounded-full bg-[#BD9479] px-8 text-base font-normal text-white hover:bg-[#BD9479] cursor-pointer"
                >
                  {item.label}
                </Button>
              ) : (
                <span className="text-base text-[#5B4F47] transition-colors hover:text-[#BD9479]">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-[#6b7280]" /> : <Menu className="h-6 w-6 text-[#6b7280]" />}
        </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[300] flex min-h-[100dvh] flex-col bg-[#F8F7F4] lg:hidden">
          <div className="flex items-center justify-between border-b border-[#d4cfc0] px-6 py-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <h1 className="text-2xl font-semibold tracking-wide text-[#745E4D]">PERSONAL TEST, INC.</h1>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              aria-expanded={isMenuOpen}
            >
              <X className="h-6 w-6 text-[#6b7280]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="flex flex-col items-stretch gap-4 text-center">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={buildUrl(item.href)}
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentPage === item.key ? (
                    <Button
                      variant="default"
                      className="w-full rounded-full bg-[#BD9479] px-8 text-base font-normal text-white hover:bg-[#BD9479] text-center"
                    >
                      {item.label}
                    </Button>
                  ) : (
                  <span className="block text-base text-[#6b7280] transition-colors hover:text-[#BD9479] text-center">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
