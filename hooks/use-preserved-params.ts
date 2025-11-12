 "use client"

import { useEffect, useState } from "react"

/**
 * Hook to preserve current URL query parameters when navigating
 * @returns Function to build URLs with preserved query parameters
 */
export function usePreservedParams() {
 const [currentParams, setCurrentParams] = useState("")

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      setCurrentParams(window.location.search.replace("?", ""))
    }
  }, [])

  const buildUrl = (baseHref: string) => {
    return currentParams ? `${baseHref}?${currentParams}` : baseHref
  }

  return { buildUrl, currentParams }
}