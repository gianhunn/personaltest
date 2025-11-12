import Navigation from "@/components/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getStyleData, getSubStyleData, hasSubStyles } from "@/lib/data/getStyleData"
import type { StyleData } from "@/lib/data/types"

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

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  return typeof (value as unknown as Promise<T>)?.then === "function"
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

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="test" />

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center">
          {/* Left side - Title and Description */}
          <div className="space-y-8 w-3/5">
            <header>
              <h1 className="font-serif text-6xl lg:text-7xl text-[#5a5a5a] leading-tight">
                BẠN LÀ <span className="text-[#9b8b7e] italic">{styleData.personalityType}</span>
              </h1>
              <p className="font-serif text-5xl lg:text-7xl text-[#5a5a5a] mt-2 italic font-bold">{styleData.personalityTitle}</p>
            </header>

            {/* Description bullets */}
            <ul className="space-y-2 text-[#5a5a5a] list-none text-xl text-justify">
              {styleData.descriptionBullets.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <span aria-hidden="true" className="relative text-5xl -top-[10px]">•</span>
                  <div>
                    <span className="font-semibold">{bullet.bold}</span>
                    <span className="leading-relaxed">{bullet.regular}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Personality Dimensions */}
          <aside className="space-y-8 w-1/5 flex justify-end" aria-label="Các đặc điểm tính cách">
            <dl className="space-y-6">
              {styleData.personalityDimensions.map((dimension, index) => (
                <div key={index}>
                  <dt className="text-4xl font-semibold text-[#5a5a5a] text-end">{dimension.en}</dt>
                  <dd className="text-2xl text-[#999] text-end">({dimension.vi})</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Style Section */}
      <section className="container max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between">
          <p className="w-fit text-nowrap text-3xl text-[#5a5a5a] mb-12">PHONG CÁCH CỦA BẠN LÀ</p>
          <div className="text-right">
            <h2 className="font-serif text-4xl lg:text-5xl text-[#5a5a5a] mb-4 font-bold">
              <span className="italic">{styleData.styleName}</span>
            </h2>
            <p className="text-4xl text-[#5a5a5a] mb-12 text-right">{styleData.styleDescription}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {styleData.outfitImages.map((outfit, index) => (
            <div
              key={index}
              className={`relative w-full ${index === 1 ? "aspect-[1/2]" : "aspect-[2/3]"}`}
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
      <section className="container max-w-7xl mx-auto px-6 py-16">
        <h3 className="font-serif text-4xl text-[#9b8b7e] italic mb-12">GỢI Ý PHỐI TRANG PHỤC</h3>

        <div className="rounded-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Outfit Flat Lay */}
            <div className="relative w-full aspect-[3/4]">
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
              <div className="grid grid-cols-[96px_1fr] md:grid-cols-[128px_1fr] gap-6 items-start">
                {/* Stacked preview images */}
                <div className="flex flex-col gap-4">
                  {styleData.styleGuideItems.slice(0, 2).map((item, index) => (
                    <div key={index} className={`${index === 0 ? "z-[3]" : "z-[2]"} relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden [:not(:first-child)]:mt-[-35px]`}>
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
                        } flex justify-center items-center rounded-xl text-white gap-4 h-24 md:h-32 [:not(:first-child)]:mt-[-35px] relative`}
                    >
                      <div className={`${index > 0 ? "mb-[-10px]" : ""} w-full flex justify-between items-center px-4`}>
                        <h4 className="font-semibold text-lg w-1/3">{item.title}</h4>
                        <p className="text-md text-white/80 w-2/3 text-justify">{item.description}</p>
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
      <section className="relative h-[600px] w-full opacity-[70]" aria-label="Tuyên ngôn phong cách">
        <Image
          src={styleData.quoteSection.backgroundImage}
          alt={styleData.quoteSection.backgroundImageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <blockquote className="container flex items-center flex-col max-w-8xl mx-auto px-6 py-16">
            <pre className="w-full max-w-7xl font-serif text-4xl lg:text-7xl text-white text-justify mb-8 italic text-wrap">
              {styleData.quoteSection.quote}
            </pre>
            <p className="w-full max-w-7xl text-white leading-relaxed text-2xl text-justify">
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
    </div>
  )
}

