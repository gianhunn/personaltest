"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage?: "home" | "test" | "about" | "clients" | "contact"
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Home", href: "/", key: "home" },
    { label: "Test", href: "/test", key: "test" },
    { label: "Contact us", href: "/about", key: "about" },
  ]

  const renderNavLink = (label: string, href: string, key: string) => (
    <Link href={href}>
      {currentPage === key ? (
        <Button
          variant="default"
          className="rounded-full bg-[#BD9479] px-8 text-base font-normal text-white hover:bg-[#BD9479]"
        >
          {label}
        </Button>
      ) : (
        <span className="text-base text-[#6b7280] transition-colors hover:text-[#BD9479]">{label}</span>
      )}
    </Link>
  )

  return (
    <nav className="border-b border-[#d4cfc0]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="hidden items-center gap-8 md:flex">
          {menuItems.slice(0, 3).map((item) => renderNavLink(item.label, item.href, item.key))}
        </div>

        <Link href="/" className="flex-shrink-0">
          <h1 className="font-serif text-2xl tracking-wide text-[#6b7280] md:text-3xl">PERSONAL TEST, INC.</h1>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {menuItems.slice(3).map((item) => renderNavLink(item.label, item.href, item.key))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6 text-[#6b7280]" /> : <Menu className="h-6 w-6 text-[#6b7280]" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#d4cfc0] bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link key={item.key} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {currentPage === item.key ? (
                  <Button
                    variant="default"
                    className="w-full rounded-full bg-[#BD9479] px-8 text-base font-normal text-white hover:bg-[#BD9479]"
                  >
                    {item.label}
                  </Button>
                ) : (
                  <span className="block text-base text-[#6b7280] transition-colors hover:text-[#BD9479]">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
