// Types for Home page components
export type EllipseOverlayProps = {
  position: number
  rotate?: boolean
}

export type HeroContentProps = {
  className?: string
  showBottomMargin?: boolean
}

export type ContentItemProps = {
  title: string
  description: string
  className?: string
}

export type CarouselImageProps = {
  src: string
  alt: string
  index: number
}
