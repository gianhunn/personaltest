"use client"

import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { EllipseOverlay, HeroContent, CarouselImage, ContentItem } from "@/components/home"
import {
  GALLERY_IMAGES,
  ELLIPSE_CONFIG,
  CAROUSEL_CONFIG,
  WHY_TAKE_TEST_ITEMS,
  HOW_TO_ITEMS,
} from "@/lib/home/constants"

export default function Home() {
  const [api, setApi] = useState<CarouselApi>()
  const [autoplayPlugin, setAutoplayPlugin] = useState<ReturnType<typeof Autoplay> | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize autoplay plugin and handle responsive breakpoint
  useEffect(() => {
    if (!mounted) return

    // Initialize plugin
    setAutoplayPlugin(
      Autoplay({
        delay: CAROUSEL_CONFIG.autoplayDelay,
        stopOnInteraction: false
      })
    )

    // Use MediaQueryList for efficient responsive detection
    const mediaQuery = window.matchMedia(`(min-width: ${CAROUSEL_CONFIG.breakpoint}px)`)

    // Set initial state
    setIsDesktop(mediaQuery.matches)

    // Handle media query changes
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // Fallback for older browsers (Safari < 14)
      const legacyHandler = () => setIsDesktop(mediaQuery.matches)
      mediaQuery.addListener(legacyHandler)
      return () => mediaQuery.removeListener(legacyHandler)
    }
  }, [mounted])

  // Memoize clip-path style to avoid recalculation
  const carouselClipPath = useMemo(
    () =>
      isDesktop
        ? {
            clipPath: "ellipse(100% clamp(200px, 25vw, 350px) at 50% 50%)",
            WebkitClipPath: "ellipse(100% clamp(200px, 25vw, 350px) at 50% 50%)",
          }
        : {},
    [isDesktop]
  )

  // Calculate desktop hero content position
  const desktopHeroTop = useMemo(
    () =>
      `calc(${ELLIPSE_CONFIG.desktopMinHeight}px - ${Math.abs(
        ELLIPSE_CONFIG.position
      )}px + ${ELLIPSE_CONFIG.height / 2}px)`,
    []
  )

  if (!mounted) {
    return <div className="min-h-screen bg-[#f8f7f4]" />
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="home" />

      {/* Hero Section with Gallery */}
      <section className="pt-8 pb-0 md:pt-8 md:pb-40 relative">
        {/* Carousel Container */}
        <div
          className={`relative w-full flex ${isDesktop ? "items-center" : "items-start"} justify-center overflow-hidden`}
          style={{
            minHeight: isDesktop ? `${ELLIPSE_CONFIG.desktopMinHeight}px` : "auto",
          }}
        >
          {/* Carousel with responsive clip-path (desktop only) */}
          <div
            className="relative z-10 w-full px-4"
            style={carouselClipPath}
            suppressHydrationWarning
          >
            <Carousel
              setApi={setApi}
              plugins={autoplayPlugin ? [autoplayPlugin] : []}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
                duration: CAROUSEL_CONFIG.scrollDuration,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {GALLERY_IMAGES.map((image, index) => (
                  <CarouselItem key={`gallery-${index}`} className="pl-2 md:pl-4 basis-auto">
                    <CarouselImage
                      src={image}
                      alt={`Fashion image ${index + 1}`}
                      index={index}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Ellipse Background Overlay - Desktop only */}
          <div
            className="hidden md:block absolute inset-0 z-20 pointer-events-none"
            suppressHydrationWarning
            aria-hidden="true"
          >
            <EllipseOverlay position={ELLIPSE_CONFIG.position} />
            <EllipseOverlay position={ELLIPSE_CONFIG.position} rotate />
          </div>
        </div>

        {/* Hero Content - Mobile: Below carousel */}
        <HeroContent className="md:hidden mt-6" showBottomMargin />

        {/* Hero Content - Desktop: Overlay on ellipse */}
        <div
          className="hidden md:block absolute left-0 right-0 z-[100] pointer-events-none"
          style={{
            top: desktopHeroTop,
            transform: "translateY(-50%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full pointer-events-auto">
            <HeroContent />
          </div>
        </div>
      </section>

      {/* Why Take Test Section */}
      <section className="pt-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-8 md:space-y-12">
              {WHY_TAKE_TEST_ITEMS.map((item, index) => (
                <ContentItem key={`why-test-${index}`} title={item.title} description={item.description} />
              ))}
            </div>
            <div className="flex items-center order-first md:order-none">
              <h2 className="text-4xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light text-balance leading-tight text-right">
                VÌ SAO NÊN LÀM TEST?
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light mb-10 md:mb-16">
            LÀM THẾ NÀO?
          </h2>

          <div className="space-y-8 md:space-y-12 mb-8 md:mb-12">
            {HOW_TO_ITEMS.map((item, index) => (
              <ContentItem
                key={`how-to-${index}`}
                title={item.title}
                description={item.description}
                className="max-w-2xl"
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              href="/test"
              className="inline-block px-10 py-3 border-2 border-[#6b5d52] text-[#6b5d52] font-serif text-base tracking-widest uppercase transition-all hover:bg-[#6b5d52] hover:text-white rounded-full"
            >
              TEST NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
