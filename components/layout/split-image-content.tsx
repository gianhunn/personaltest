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
      className={cn("grid min-h-[calc(100vh-120px)] w-full grid-cols-1 lg:grid-cols-2", className)}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden lg:justify-start",
          leftColumnClassName,
        )}
      >
        <div className="relative h-full w-full">
          <section
            className={cn(
              "flex h-full w-full items-center justify-start py-12 lg:py-20",
              imageSectionClassName,
            )}
          >
            <MaskedVectorImage
              imageSrc={imageSrc}
              alt={alt}
              containerClassName={cn(
                "w-full max-w-[520px] sm:max-w-[600px] lg:max-w-none lg:w-[700px] lg:-ml-20 xl:w-[760px] xl:-ml-28 2xl:w-[920px] 2xl:-ml-36",
                imageContainerClassName,
              )}
            />
          </section>
        </div>
      </div>

      <div
        className={cn("flex items-center justify-center px-8 py-16 lg:px-16", rightColumnClassName)}
      >
        {children}
      </div>
    </Component>
  )
}

