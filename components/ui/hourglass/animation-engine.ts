import type { Particle, Polygon, SandState, AnimationConfig } from './types'
import { clipPolygon, getPolygonBounds, createVerticalGradient } from './utils'
import { COLORS } from './constants'

/**
 * Animation engine for hourglass sand flow
 */
export class HourglassAnimationEngine {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private config: AnimationConfig
  private particles: Particle[] = []

  private topPolygon: Polygon
  private bottomPolygon: Polygon
  private topBounds: ReturnType<typeof getPolygonBounds>
  private bottomBounds: ReturnType<typeof getPolygonBounds>
  private streamRect: { x: number; y: number; width: number; height: number }
  private topEllipse: { cx: number; cy: number; rx: number; ry: number }
  private bottomEllipse: { cx: number; cy: number; rx: number; ry: number }

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: AnimationConfig,
    topPolygon: Polygon,
    bottomPolygon: Polygon,
    streamRect: { x: number; y: number; width: number; height: number },
    topEllipse: { cx: number; cy: number; rx: number; ry: number },
    bottomEllipse: { cx: number; cy: number; rx: number; ry: number }
  ) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.config = config
    this.topPolygon = topPolygon
    this.bottomPolygon = bottomPolygon
    this.streamRect = streamRect
    this.topEllipse = topEllipse
    this.bottomEllipse = bottomEllipse
    this.topBounds = getPolygonBounds(topPolygon)
    this.bottomBounds = getPolygonBounds(bottomPolygon)
  }

  /**
   * Spawn a new particle
   */
  spawnParticle() {
    const baseX = this.streamRect.x + this.streamRect.width / 2
    const size = Math.max(1, this.width * 0.009)

    this.particles.push({
      x: baseX,
      y: this.streamRect.y + Math.random() * 6,
      vx: (Math.random() - 0.5) * 0.32,
      vy: 1.15 + Math.random() * 0.75,
      life: 0.8,
      size,
    })
  }

  /**
   * Update particle physics
   */
  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]

      // Apply gravity
      p.vy += 0.035
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.03

      // Bounce at bottom
      const lowerBound = this.bottomBounds.maxY
      const isBeyond = p.y >= lowerBound - p.size * 1.5

      if (isBeyond) {
        p.y = lowerBound - p.size * (1.5 + Math.random() * 0.6)
        p.vy *= -0.18 - Math.random() * 0.08
        p.vx *= 0.55
        p.life -= 0.06
      }

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }

  /**
   * Draw particles
   */
  drawParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      const opacity = Math.max(0, Math.min(1, p.life + 0.15))

      this.ctx.save()

      // Clip to bottom polygon if particle has settled
      const isSettled = p.y > this.streamRect.y + this.streamRect.height
      if (isSettled) {
        clipPolygon(this.ctx, this.bottomPolygon)
      }

      this.ctx.fillStyle = `rgba(245, 193, 90, ${opacity})`
      this.ctx.beginPath()
      this.ctx.ellipse(p.x, p.y, p.size, p.size * 0.9, 0, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    }
  }

  /**
   * Draw top sand chamber
   */
  drawTopSand(amount: number) {
    if (amount <= 0) return

    this.ctx.save()
    clipPolygon(this.ctx, this.topPolygon)

    const gradient = createVerticalGradient(
      this.ctx,
      0,
      this.topBounds.minY,
      this.topBounds.maxY,
      [
        { offset: 0, color: COLORS.topSand.start },
        { offset: 1, color: COLORS.topSand.end },
      ]
    )

    this.ctx.fillStyle = gradient
    const h = ((this.topBounds.maxY - this.topBounds.minY) * amount) / 100
    this.ctx.fillRect(0, this.topBounds.maxY - h, this.width, h + 1.5)
    this.ctx.restore()
  }

  /**
   * Draw bottom sand chamber
   */
  drawBottomSand(amount: number) {
    if (amount <= 0) return

    this.ctx.save()
    clipPolygon(this.ctx, this.bottomPolygon)

    const gradient = createVerticalGradient(
      this.ctx,
      0,
      this.bottomBounds.minY,
      this.bottomBounds.maxY,
      [
        { offset: 0, color: COLORS.bottomSand.start },
        { offset: 1, color: COLORS.bottomSand.end },
      ]
    )

    this.ctx.fillStyle = gradient
    const h = ((this.bottomBounds.maxY - this.bottomBounds.minY) * amount) / 100
    this.ctx.fillRect(0, this.bottomBounds.maxY - h, this.width, h + 1.5)
    this.ctx.restore()
  }

  /**
   * Draw top ellipse cap
   */
  drawTopCap(amount: number) {
    if (amount <= 0) return

    this.ctx.save()
    const gradient = createVerticalGradient(
      this.ctx,
      this.topEllipse.cx,
      this.topEllipse.cy - this.topEllipse.ry,
      this.topEllipse.cy + this.topEllipse.ry,
      [
        { offset: 0, color: COLORS.topCap.start },
        { offset: 1, color: COLORS.topCap.end },
      ]
    )

    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.ellipse(
      this.topEllipse.cx,
      this.topEllipse.cy,
      this.topEllipse.rx,
      this.topEllipse.ry,
      0,
      0,
      Math.PI * 2
    )
    this.ctx.fill()
    this.ctx.restore()
  }

  /**
   * Draw bottom ellipse cap
   */
  drawBottomCap(amount: number) {
    if (amount <= 0) return

    this.ctx.save()
    const gradient = createVerticalGradient(
      this.ctx,
      this.bottomEllipse.cx,
      this.bottomEllipse.cy - this.bottomEllipse.ry,
      this.bottomEllipse.cy + this.bottomEllipse.ry,
      [
        { offset: 0, color: COLORS.bottomCap.start },
        { offset: 1, color: COLORS.bottomCap.end },
      ]
    )

    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.ellipse(
      this.bottomEllipse.cx,
      this.bottomEllipse.cy,
      this.bottomEllipse.rx,
      this.bottomEllipse.ry,
      0,
      0,
      Math.PI * 2
    )
    this.ctx.fill()
    this.ctx.restore()
  }

  /**
   * Draw sparkles effect
   */
  drawSparkles(amount: number) {
    if (amount <= 0) return

    const sparkleCount = Math.max(2, Math.floor(amount / 18))

    this.ctx.save()
    clipPolygon(this.ctx, this.bottomPolygon)
    this.ctx.fillStyle = COLORS.sparkle

    const xMin = Math.min(...this.bottomPolygon.map((p) => p.x))
    const xMax = Math.max(...this.bottomPolygon.map((p) => p.x))

    for (let i = 0; i < sparkleCount; i++) {
      const x = xMin + Math.random() * (xMax - xMin)
      const yRange = ((this.bottomBounds.maxY - this.bottomBounds.minY) * amount) / 100
      const y = this.bottomBounds.maxY - Math.random() * yRange
      const w = Math.max(1, this.width * 0.006)
      const h = w * (1.8 + Math.random())
      this.ctx.fillRect(x, y, w, h)
    }

    this.ctx.restore()
  }

  /**
   * Clear particles
   */
  clearParticles() {
    this.particles = []
  }

  /**
   * Get particle count
   */
  getParticleCount() {
    return this.particles.length
  }

  /**
   * Render complete frame
   */
  render(sandState: { sandTop: number; sandBottom: number }, showParticles: boolean) {
    this.ctx.clearRect(0, 0, this.width, this.height)

    // Draw sand chambers
    this.drawTopSand(sandState.sandTop)
    this.drawBottomSand(sandState.sandBottom)

    // Draw caps
    this.drawTopCap(sandState.sandTop)
    this.drawBottomCap(sandState.sandBottom)

    // Draw particles and effects
    if (showParticles) {
      this.drawParticles()
      this.drawSparkles(sandState.sandBottom)
    }
  }
}
