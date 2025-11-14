import { ElementType, ReactNode } from "react"

import { MaskedVectorImage } from "@/components/ui/masked-vector-image"
import { cn } from "@/lib/utils"

type SplitImageContentProps = {
  as?: ElementType
  imageSrc: string
  alt: string
  imageContainerClassName?: string
  imageSectionClassName?: string
  leftColumnClassName?: string
  rightColumnClassName?: string
  className?: string
  children: ReactNode
}

export function SplitImageContent({
  as: Component = "div",
  imageSrc,
  alt,
  imageContainerClassName,
  imageSectionClassName,
  leftColumnClassName,
  rightColumnClassName,
  className,
  children,
}: SplitImageContentProps) {
  return (
    <Component
      className={cn(
        "grid min-h-screen w-full grid-cols-1 gap-8 overflow-hidden px-6 py-12 sm:px-8 sm:py-14 lg:min-h-[calc(100vh-120px)] lg:grid-cols-2 lg:gap-0 lg:px-0 lg:py-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-3xl bg-[#f1ebe5] px-4 py-10 sm:px-6 sm:py-12 lg:order-first lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:justify-start",
          leftColumnClassName,
        )}
      >
        <div className="relative h-full w-full lg:max-h-[calc(100vh-120px)]">
          <section
            className={cn(
              "flex h-full w-full items-center justify-center lg:justify-start",
              imageSectionClassName,
            )}
          >
            <MaskedVectorImage
              imageSrc={imageSrc}
              alt={alt}
              containerClassName={cn(
                "w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-none lg:-ml-10 xl:max-w-[640px] xl:-ml-16 2xl:max-w-[820px] 2xl:-ml-20",
                imageContainerClassName,
              )}
            />
          </section>
        </div>
      </div>

      <div
        className={cn(
          "flex items-start justify-center rounded-3xl bg-white px-4 py-6 sm:px-6 sm:py-8 lg:order-last lg:rounded-none lg:bg-transparent lg:px-12 lg:py-12 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto",
          rightColumnClassName,
        )}
      >
        {children}
      </div>
    </Component>
  )
}

