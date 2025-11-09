export type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
}

export type Point2D = {
  x: number
  y: number
}

export type Polygon = Point2D[]

export type SandState = {
  sandTop: number
  sandBottom: number
  frameCount: number
  rotation: number
  flipping: boolean
  flipProgress: number
}

export type AnimationConfig = {
  sandFlowSpeed: number
  flipSpeed: number
  particleSpawnRate: number
  maxParticleCount: number
}

export type HourglassLoaderProps = {
  width?: number
  height?: number
  className?: string
  message?: string
  messageClassName?: string
  animatedSand?: boolean
}
