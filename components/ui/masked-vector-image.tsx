import type { ComponentPropsWithoutRef } from "react"
import type React from "react"

import { cn } from "@/lib/utils"

const VECTOR_MASK_URL = "/images/common/vector-mask.svg"
const VECTOR_ASPECT_RATIO = "683 / 596"
const BASE_MASK_STYLES: React.CSSProperties = {
  maskSize: "cover",
  WebkitMaskSize: "cover",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
}

type MaskedVectorImageProps = {
  imageSrc: string
  alt?: string
  containerClassName?: string
  containerStyle?: React.CSSProperties
  maskUrl?: string
  aspectRatio?: React.CSSProperties["aspectRatio"]
  className?: string
  style?: React.CSSProperties
} & Omit<ComponentPropsWithoutRef<"img">, "src" | "alt" | "style" | "className">

export function MaskedVectorImage({
  imageSrc,
  alt = "Masked vector image",
  className,
  containerClassName,
  style,
  containerStyle,
  maskUrl = VECTOR_MASK_URL,
  aspectRatio = VECTOR_ASPECT_RATIO,
  ...imgProps
}: MaskedVectorImageProps) {
  const maskStyles: React.CSSProperties = {
    ...BASE_MASK_STYLES,
    maskImage: `url('${maskUrl}')`,
    WebkitMaskImage: `url('${maskUrl}')`,
    ...style,
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", containerClassName)}
      style={containerStyle}
    >
      <div className="relative w-full" style={{ aspectRatio }}>
        <img
          src={imageSrc}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
          style={maskStyles}
          {...imgProps}
        />
      </div>
    </div>
  )
}
