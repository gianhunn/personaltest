"use client"

import { useMemo } from "react"
import Image from "next/image"
import type { EllipseOverlayProps } from "./types"
import { ELLIPSE_CONFIG } from "@/lib/home/constants"

export function EllipseOverlay({ position, rotate = false }: EllipseOverlayProps) {
  const style: React.CSSProperties = useMemo(
    () => ({
      [rotate ? "bottom" : "top"]: `${position}px`,
      left: 0,
      right: 0,
      width: "100%",
      height: `${ELLIPSE_CONFIG.height}px`,
    }),
    [position, rotate]
  )

  return (
    <div className={`absolute ${rotate ? "rotate-180" : ""}`} style={style}>
      <div className="relative w-full h-full">
        <Image
          src="/images/carousel/ellipse-background.svg"
          alt="Ellipse background decoration"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
