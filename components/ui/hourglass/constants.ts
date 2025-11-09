import type { Polygon } from './types'

// Animation configuration
export const DEFAULT_CONFIG = {
  sandFlowSpeed: 2,
  flipSpeed: 0.06,
  particleSpawnRate: 2,
  maxParticleCount: 40,
}

// Hourglass geometry (normalized coordinates)
export const TOP_POLYGON: Polygon = [
  { x: 28 / 120, y: 28 / 180 },
  { x: 92 / 120, y: 28 / 180 },
  { x: 61 / 120, y: 90 / 180 },
  { x: 59 / 120, y: 90 / 180 },
]

export const BOTTOM_POLYGON: Polygon = [
  { x: 59 / 120, y: 90 / 180 },
  { x: 61 / 120, y: 90 / 180 },
  { x: 94 / 120, y: 156 / 180 },
  { x: 26 / 120, y: 156 / 180 },
]

export const GLASS_PATH =
  "M96 24A36 8 0 0 0 24 24L59 90 24 156A36 8 0 0 0 96 156L61 90 96 24Z"

export const STREAM_RECT = {
  x: 57 / 120,
  y: 88 / 180,
  width: 6 / 120,
  height: 40 / 180,
}

// Ellipse positions (normalized)
export const TOP_ELLIPSE = {
  cx: 0.5,
  cy: 23 / 180,
  rx: 34 / 120,
  ry: 7.5 / 180,
}

export const BOTTOM_ELLIPSE = {
  cx: 0.5,
  cy: 157 / 180,
  rx: 34 / 120,
  ry: 7.5 / 180,
}

// Colors
export const COLORS = {
  topCap: {
    start: "#f7c57e",
    end: "#f4a546",
  },
  bottomCap: {
    start: "#f2a443",
    end: "#c36900",
  },
  topSand: {
    start: "#f7a23a",
    end: "#c36800",
  },
  bottomSand: {
    start: "#fccd74",
    end: "#d47b02",
  },
  particle: "rgb(245, 193, 90)",
  sparkle: "rgba(255, 214, 132, 0.65)",
  glassBorder: {
    outer: ["#fde7a8", "#fbdc7c", "#f6c96a"],
    inner: ["#fff4d4", "#fff6df", "#fff7e6"],
  },
  glassBackground: ["#fff7d5", "#fff0b8"],
}
