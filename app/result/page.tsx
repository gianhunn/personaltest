import Navigation from "@/components/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getStyleData, getSubStyleData, hasSubStyles } from "@/lib/data/getStyleData"
import type { StyleData } from "@/lib/data/types"
import { HOW_TO_GET_CONFIDENT_ITEMS, NOT_ONLY_YOU_ITEMS } from "@/lib/home/constants"
import Link from "next/link"

const DEFAULT_STYLE_KEY = "esfp"
const DEFAULT_STYLE_INDEX = 0

type GenderParam = "male" | "female" | null
type SearchParams = { [key: string]: string | string[] | undefined }
type SearchParamsInput = SearchParams | Promise<SearchParams>

type ResolvedStyleData = {
  styleKey: string
  styleIndex: number
  subStyleIndex: number
  gender: GenderParam
  styleData: StyleData
}

const NOT_ONLY_YOU_TEXTS = NOT_ONLY_YOU_ITEMS.map((item) => item.text)
const HOW_TO_GET_CONFIDENT_TEXTS = HOW_TO_GET_CONFIDENT_ITEMS.map((item) => item.text)

function extractParam(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    return value
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] ?? null : null
  }

  return null
}

function parseGender(value: string | null): GenderParam {
  if (value === "male" || value === "female") {
    return value
  }
  return null
}

function parseNumber(value: string | null, fallback: number): number {
  if (!value) {
    return fallback
  }

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

function selectStyleData(styleKey: string, gender: GenderParam, styleIndex: number, subStyleIndex?: number) {
  const baseStyle = getStyleData(styleKey, styleIndex)

  if (!hasSubStyles(baseStyle)) {
    return { styleData: baseStyle as StyleData, subStyleIndex: 0 }
  }

  const subStyles = baseStyle.subStyles
  const genderMatchedIndex = gender ? subStyles.findIndex((subStyle) => subStyle.gender === gender) : -1

  const preferredIndex =
    typeof subStyleIndex === "number" && subStyleIndex >= 0
      ? subStyleIndex
      : genderMatchedIndex >= 0
        ? genderMatchedIndex
        : 0

  const normalizedIndex =
    preferredIndex >= 0 && preferredIndex < subStyles.length
      ? preferredIndex
      : 0

  const styleData = getSubStyleData(styleKey, normalizedIndex, styleIndex)

  return {
    styleData,
    subStyleIndex: normalizedIndex,
  }
}

function resolveStyle(styleKey: string, gender: GenderParam, styleIndex: number, subStyleIndex?: number): ResolvedStyleData {
  try {
    const { styleData, subStyleIndex: resolvedSubStyleIndex } = selectStyleData(styleKey, gender, styleIndex, subStyleIndex)

    return {
      styleKey,
      styleIndex,
      subStyleIndex: resolvedSubStyleIndex,
      gender,
      styleData,
    }
  } catch (error) {
    console.error(`Unable to resolve style data for key "${styleKey}" and index "${styleIndex}". Falling back to defaults.`, error)

    if (styleKey !== DEFAULT_STYLE_KEY || styleIndex !== DEFAULT_STYLE_INDEX) {
      return resolveStyle(DEFAULT_STYLE_KEY, gender, DEFAULT_STYLE_INDEX)
    }

    throw error
  }
}

function resolveFromSearchParams(searchParams: SearchParams): ResolvedStyleData {
  const styleKey = (extractParam(searchParams.style)?.toLowerCase() ?? DEFAULT_STYLE_KEY).trim() || DEFAULT_STYLE_KEY
  const gender = parseGender(extractParam(searchParams.gender))
  const styleIndex = parseNumber(extractParam(searchParams.styleIndex), DEFAULT_STYLE_INDEX)
  const rawSubStyleIndex = extractParam(searchParams.subStyleIndex)
  const subStyleIndex = rawSubStyleIndex === null ? undefined : parseNumber(rawSubStyleIndex, 0)

  return resolveStyle(styleKey, gender, styleIndex, subStyleIndex)
}

type ConfidenceSplitSectionProps = {
  heading: string
  items: ReadonlyArray<string>
}

function ConfidenceSplitSection({ heading, items }: ConfidenceSplitSectionProps) {
  return (
    <div className="pt-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="order-last space-y-6 md:order-first md:space-y-8">
            {items.map((text, index) => (
              <p
                key={`confidence-split-${index}`}
                className="text-base leading-relaxed text-[#7b6b61] sm:text-lg md:text-xl"
              >
                {text}
              </p>
            ))}
          </div>
          <div className="flex items-center order-first md:order-none">
            <h2 className="text-balance text-left text-3xl font-bold tracking-wide text-[#6b5d52] leading-tight sm:text-4xl md:text-5xl lg:text-6xl lg:text-right">
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

type ConfidenceStackedSectionProps = {
  heading: string
  items: ReadonlyArray<string>
}

function ConfidenceStackedSection({ heading, items }: ConfidenceStackedSectionProps) {
  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-wide text-[#6b5d52] sm:text-4xl md:mb-16 md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <div className="space-y-6 md:space-y-8">
          {items.map((text, index) => (
            <p
              key={`confidence-stacked-${index}`}
              className="max-w-2xl text-base leading-relaxed text-[#7b6b61] sm:text-lg md:text-xl"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  return typeof (value as unknown as Promise<T>)?.then === "function"
}

function buildUrlWithParams(path: string, params: SearchParams): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (value) {
        searchParams.set(key, value)
      }
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item) {
          searchParams.append(key, item)
        }
      })
    }
  })

  const query = searchParams.toString()
  return query ? `${path}?${query}` : path
}

async function unwrapSearchParams(searchParams: SearchParamsInput): Promise<SearchParams> {
  if (isPromise(searchParams)) {
    return await searchParams
  }
  return searchParams
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParamsInput }): Promise<Metadata> {
  const resolvedSearchParams = await unwrapSearchParams(searchParams)
  const resolved = resolveFromSearchParams(resolvedSearchParams)

  return {
    title: resolved.styleData.metadata.title,
    description: resolved.styleData.metadata.description,
  }
}

export default async function ResultPage({ searchParams }: { searchParams: SearchParamsInput }) {
  const resolvedSearchParams = await unwrapSearchParams(searchParams)
  const resolved = resolveFromSearchParams(resolvedSearchParams)
  const { styleData } = resolved
  const preservedContactUrl = buildUrlWithParams("/contact", resolvedSearchParams)

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="test" />

      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left side - Title and Description */}
          <div className="w-full space-y-6 text-center lg:w-3/5 lg:space-y-8 lg:text-left">
            <header>
              <h1 className="text-4xl leading-tight text-[#5a5a5a] sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
                BẠN LÀ <span className="text-[#9b8b7e] italic">{styleData.personalityType}</span>
              </h1>
              <p className="mt-3 text-3xl font-bold italic text-[#5a5a5a] sm:text-4xl lg:text-5xl xl:text-6xl">
                {styleData.personalityTitle}
              </p>
            </header>

            {/* Description bullets */}
            <ul className="list-none space-y-3 text-justify text-base text-[#5a5a5a] sm:text-lg md:text-xl">
              {styleData.descriptionBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span aria-hidden="true" className="relative -top-1 text-3xl sm:text-4xl">•</span>
                  <div className="text-left">
                    <span className="font-semibold">{bullet.bold}</span>
                    <span className="leading-relaxed">{bullet.regular}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Personality Dimensions */}
          <aside
            className="flex w-full justify-center text-center lg:w-1/3 lg:justify-end lg:text-right"
            aria-label="Các đặc điểm tính cách"
          >
            <dl className="space-y-4 sm:space-y-6">
              {styleData.personalityDimensions.map((dimension, index) => (
                <div key={index}>
                  <dt className="font-semibold text-[#5a5a5a] text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                    {dimension.en}
                  </dt>
                  <dd className="text-sm text-[#999] sm:text-base md:text-xl lg:text-2xl">({dimension.vi})</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Style Section */}
      <section className="container mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-right">
          <p className="text-xl text-[#5a5a5a] sm:text-2xl md:text-3xl">PHONG CÁCH CỦA BẠN LÀ</p>
          <div className="space-y-3 lg:text-right">
            <h2 className="text-3xl font-bold text-[#5a5a5a] sm:text-4xl lg:text-5xl">
              <span className="italic">{styleData.styleName}</span>
            </h2>
            <p className="text-lg text-[#5a5a5a] sm:text-xl md:text-2xl lg:text-3xl">
              {styleData.styleDescription}
            </p>
          </div>
        </div>
        <div className="mb-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {styleData.outfitImages.map((outfit, index) => (
            <div
              key={index}
              className={`relative w-full ${index === 1 ? "aspect-[3/4] sm:aspect-[1/2]" : "aspect-[3/4] lg:aspect-[2/3]"}`}
            >
              <Image
                src={outfit.src}
                alt={outfit.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover rounded-lg"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Style Guide - Phối Trạng Phục */}
      <section className="container mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <h3 className="mb-10 text-3xl italic text-[#9b8b7e] sm:text-4xl">GỢI Ý PHỐI TRANG PHỤC</h3>

        <div className="rounded-lg">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            {/* Left: Outfit Flat Lay */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src={styleData.styleGuideOutfitImage.src}
                alt={styleData.styleGuideOutfitImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                loading="lazy"
              />
            </div>

            {/* Right: Palette + Preview Images + Cards */}
            <div className="space-y-8">
              {/* Color Palette aligned right */}
              <div className="flex justify-end gap-4" role="list" aria-label="Bảng màu phong cách">
                {styleData.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-full"
                    style={{ backgroundColor: color }}
                    role="listitem"
                    aria-label={`Màu ${index + 1}`}
                  />
                ))}
              </div>

              {/* Preview images + cards */}
              <div className="grid grid-cols-[96px_1fr] items-start gap-6 md:grid-cols-[128px_1fr]">
                {/* Stacked preview images */}
                <div className="flex flex-col gap-4">
                  {styleData.styleGuideItems.slice(0, 2).map((item, index) => (
                    <div
                      key={index}
                      className={`${index === 0 ? "z-[3]" : "z-[2]"} relative h-24 w-24 overflow-hidden rounded-xl [:not(:first-child)]:mt-[-35px] md:h-32 md:w-32`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Info cards */}
                <div className="space-y-4">
                  {styleData.styleGuideItems.map((item, index) => (
                    <div
                      key={index}
                      className={`${index === 0
                        ? "bg-[#5b4f47] z-[3]"
                        : index === 1
                          ? "bg-[#7a5e49] z-[2]"
                          : index === 2
                            ? "bg-[#5b4f47] z-[1]"
                            : ""
                        } relative flex h-24 items-center justify-center gap-4 rounded-xl text-white [:not(:first-child)]:mt-[-35px] md:h-32`}
                    >
                      <div className={`${index > 0 ? "mb-[-10px]" : ""} flex w-full items-center justify-between px-4`}>
                        <h4 className="w-1/3 text-sm font-semibold md:text-lg">{item.title}</h4>
                        <p className="w-2/3 text-xs text-white/80 sm:text-sm md:text-base lg:text-justify">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section with Background */}
      <section className="w-full" aria-label="Tuyên ngôn phong cách">
        <div className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 md:px-12">
          <Image
            src={styleData.quoteSection.backgroundImage}
            alt={styleData.quoteSection.backgroundImageAlt}
            fill
            sizes="100vw"
            className="-z-10 object-cover brightness-[0.55] sm:brightness-100"
            priority
          />
          <div className="-z-10 absolute inset-0 bg-black/55 sm:bg-black/40" />

          <blockquote className="container mx-auto flex max-w-6xl flex-col items-center text-center lg:max-w-7xl">
            <pre className="mb-6 w-full text-pretty text-xl italic text-white sm:mb-8 sm:text-3xl lg:text-5xl">
              {styleData.quoteSection.quote}
            </pre>
            <p className="w-full max-w-5xl text-pretty text-sm leading-relaxed text-white sm:text-base md:text-lg xl:text-xl">
              {styleData.quoteSection.description.split("\n\n").map((paragraph, index, array) => (
                <span key={index}>
                  {paragraph}
                  {index < array.length - 1 && (
                    <>
                      <br />
                    </>
                  )}
                </span>
              ))}
            </p>
          </blockquote>
        </div>
      </section>

      {/* Confidence Invitation Section */}
      <section className="bg-[#f8f7f4] text-[#5a5a5a]">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-10 sm:pt-20 sm:pb-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-xl tracking-[0.2em] uppercase text-[#8b7a6f] sm:text-2xl md:text-3xl">
              Bạn đã biết nhóm MBTI và phong cách thời trang của mình
            </p>
            <div className="h-20 w-[2px] bg-[#c4a890] sm:h-30 md:h-50 lg:w-[3px]" aria-hidden="true" />
            <p className="text-2xl uppercase text-[#5a5a5a] sm:text-3xl md:text-4xl">
              Nhưng vẫn thấy khó tự tin là chính mình?
            </p>
          </div>
        </div>

        <ConfidenceSplitSection heading="BẠN KHÔNG PHẢI NGƯỜI DUY NHẤT" items={NOT_ONLY_YOU_TEXTS} />
        <ConfidenceStackedSection heading="NHƯ THẾ NÀO LÀ TỰ TIN THẬT?" items={HOW_TO_GET_CONFIDENT_TEXTS} />

        <div className="mx-auto max-w-5xl px-6 pb-24">
          <div className="mt-16 border-t border-[#d9c6b3] pt-10 text-center">
            <p className="text-xl uppercase tracking-[0.3em] text-[#8b6951] pb-[20px]">
              100 xuất cố vấn cá nhân – miễn phí 100%
            </p>
            <Link
              href={`${preservedContactUrl}#contact-form`}
              className="inline-block rounded-full border-2 border-[#6b5d52] px-10 py-3 text-base tracking-widest uppercase text-[#7b6b61] transition-all hover:bg-[#6b5d52] hover:text-white"
            >
              60-90 phút cố vấn, online và riêng tư
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

