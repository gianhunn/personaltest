import type { Polygon, Point2D } from './types'

/**
 * Simple className utility
 */
export function cn(...x: Array<string | undefined>) {
  return x.filter(Boolean).join(" ")
}

/**
 * Scale polygon coordinates to actual pixel dimensions
 */
export function scalePolygon(polygon: Polygon, width: number, height: number): Polygon {
  return polygon.map((point) => ({
    x: point.x * width,
    y: point.y * height,
  }))
}

/**
 * Clip canvas context to a polygon shape
 */
export function clipPolygon(ctx: CanvasRenderingContext2D, polygon: Polygon) {
  ctx.beginPath()
  polygon.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y)
    else ctx.lineTo(point.x, point.y)
  })
  ctx.closePath()
  ctx.clip()
}

/**
 * Get bounding box of a polygon
 */
export function getPolygonBounds(polygon: Polygon) {
  return {
    minX: Math.min(...polygon.map((p) => p.x)),
    maxX: Math.max(...polygon.map((p) => p.x)),
    minY: Math.min(...polygon.map((p) => p.y)),
    maxY: Math.max(...polygon.map((p) => p.y)),
  }
}

/**
 * Create linear gradient helper
 */
export function createVerticalGradient(
  ctx: CanvasRenderingContext2D,
  x: number,
  y1: number,
  y2: number,
  colors: Array<{ offset: number; color: string; opacity?: number }>
) {
  const gradient = ctx.createLinearGradient(x, y1, x, y2)
  colors.forEach(({ offset, color, opacity }) => {
    if (opacity !== undefined) {
      gradient.addColorStop(offset, color.replace(/[\d.]+\)$/g, `${opacity})`))
    } else {
      gradient.addColorStop(offset, color)
    }
  })
  return gradient
}
