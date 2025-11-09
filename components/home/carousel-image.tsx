import Image from "next/image"
import type { CarouselImageProps } from "./types"

export function CarouselImage({ src, alt, index }: CarouselImageProps) {
  return (
    <div
      className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow
        w-[calc((100vw-2rem-24px)/2.5)] min-w-[140px] max-w-[280px]
        md:w-[calc((100vw-2rem-48px)/3.5)] md:max-w-[320px]
        lg:w-[calc((100vw-2rem-48px)/4)] lg:max-w-[380px]"
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 140px, (max-width: 1024px) 200px, 280px"
        loading={index < 3 ? "eager" : "lazy"}
      />
    </div>
  )
}
