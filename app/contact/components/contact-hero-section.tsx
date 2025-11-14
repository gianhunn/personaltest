"use client"

import { useCallback, type MouseEvent } from "react"
import { usePreservedParams } from "@/hooks/use-preserved-params"

export function ContactHeroSection() {
  const { buildUrl } = usePreservedParams()
  const contactUrl = buildUrl("/contact")
  const contactFormAnchor = `${contactUrl}#contact-form`
  const handleScrollToForm = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const target = document.getElementById("contact-form")

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", contactFormAnchor)
    }
  }, [contactFormAnchor])
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transform bg-cover bg-center sm:bg-[position:center_-6rem] lg:bg-[position:center_-12rem] bg-[url('/images/contact-us/contact-us-background.jpg')] scale-x-[-1]"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#f8f7f4]/65" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-left px-4 py-16 sm:px-8 sm:py-20 md:px-16 lg:px-32 xl:px-48">
        <div className="w-full max-w-5xl space-y-8 text-center sm:text-left">
          <p className="font-sans text-[#4f4239]/90 text-5xl sm:text-5xl xl:text-8xl">
            Phân tích và giải đáp&nbsp;
            <span className="font-bold text-[1em] sm:text-[1.15em] md:text-[1.2em] lg:text-[1.25em] xl:text-[1.3em]">
              CÁ NHÂN
            </span>
          </p>

          <div className="mt-12 space-y-6 text-[#4f4239] sm:mt-14">
            <a
              href={contactFormAnchor}
              onClick={handleScrollToForm}
              className="font-sans text-3xl font-semibold underline decoration-2 underline-offset-4 sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl"
            >
              ĐĂNG KÝ NGAY!
            </a>
            <p className="font-sans text-2xl tracking-[0.2em] text-[#4f4239]/80 sm:text-base md:text-lg lg:text-2xl xl:text-3xl uppercase">
              ONLINE VÀ FREE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
