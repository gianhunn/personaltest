"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const TRANSITION_DURATION = 450

/**
 * Global page transition overlay for smooth navigation feedback.
 * Fades in a subtle backdrop whenever the active pathname changes.
 */
export function NavigationTransitionOverlay() {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true)
      return
    }

    setIsAnimating(true)

    const timeout = setTimeout(() => {
      setIsAnimating(false)
    }, TRANSITION_DURATION)

    return () => clearTimeout(timeout)
  }, [pathname, hasMounted])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] bg-[#f8f7f4] transition-all duration-[450ms] ease-out"
      style={{
        opacity: isAnimating ? 0.85 : 0,
        backdropFilter: isAnimating ? "blur(6px)" : "blur(0px)",
        transform: isAnimating ? "translateY(0)" : "translateY(20px)",
      }}
    />
  )
}

