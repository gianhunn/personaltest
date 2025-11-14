"use client"

import { useEffect, useRef } from "react"
import type { HourglassLoaderProps } from './types'
import { HourglassAnimationEngine } from './animation-engine'
import { HourglassSVG } from './hourglass-svg'
import { scalePolygon, cn } from './utils'
import {
  DEFAULT_CONFIG,
  TOP_POLYGON,
  BOTTOM_POLYGON,
  STREAM_RECT,
  TOP_ELLIPSE,
  BOTTOM_ELLIPSE,
} from './constants'

/**
 * HourglassLoader - Animated loading indicator with sand flow
 */
export function HourglassLoader({
  width,
  height,
  className,
  message,
  messageClassName,
  animatedSand = true,
}: HourglassLoaderProps) {
  const resolvedWidth = width ?? 128
  const resolvedHeight = height ?? 192

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const engineRef = useRef<HourglassAnimationEngine | null>(null)

  const sandStateRef = useRef({
    sandTop: 100,
    sandBottom: 0,
    frameCount: 0,
    rotation: 0,
    flipping: false,
    flipProgress: 0,
  })

  useEffect(() => {
    if (!animatedSand) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (container) {
      container.style.transform = `rotate(${sandStateRef.current.rotation}deg)`
    }

    // Setup canvas with device pixel ratio
    const dpr = window.devicePixelRatio || 1
    const widthPx = resolvedWidth
    const heightPx = resolvedHeight

    canvas.width = widthPx * dpr
    canvas.height = heightPx * dpr
    canvas.style.width = `${widthPx}px`
    canvas.style.height = `${heightPx}px`

    ctx.resetTransform()
    ctx.scale(dpr, dpr)

    // Scale geometry to actual dimensions
    const topPolygon = scalePolygon(TOP_POLYGON, widthPx, heightPx)
    const bottomPolygon = scalePolygon(BOTTOM_POLYGON, widthPx, heightPx)

    const streamRect = {
      x: STREAM_RECT.x * widthPx,
      y: STREAM_RECT.y * heightPx,
      width: STREAM_RECT.width * widthPx,
      height: STREAM_RECT.height * widthPx,
    }

    const topEllipse = {
      cx: widthPx * TOP_ELLIPSE.cx,
      cy: heightPx * TOP_ELLIPSE.cy,
      rx: widthPx * TOP_ELLIPSE.rx,
      ry: heightPx * TOP_ELLIPSE.ry,
    }

    const bottomEllipse = {
      cx: widthPx * BOTTOM_ELLIPSE.cx,
      cy: heightPx * BOTTOM_ELLIPSE.cy,
      rx: widthPx * BOTTOM_ELLIPSE.rx,
      ry: heightPx * BOTTOM_ELLIPSE.ry,
    }

    // Initialize animation engine
    const engine = new HourglassAnimationEngine(
      ctx,
      widthPx,
      heightPx,
      DEFAULT_CONFIG,
      topPolygon,
      bottomPolygon,
      streamRect,
      topEllipse,
      bottomEllipse
    )

    engineRef.current = engine

    const animate = () => {
      const st = sandStateRef.current

      // FLIP STATE: Rotating 360 degrees
      if (st.flipping) {
        st.flipProgress = Math.min(1, st.flipProgress + DEFAULT_CONFIG.flipSpeed)

        // Reset sand state at halfway point (180 degrees)
        if (st.flipProgress >= 0.5 && st.sandTop !== 100) {
          st.sandTop = 100
          st.sandBottom = 0
          engine.clearParticles()
        }

        // Ease rotation from 0° → 360°
        const eased = 1 - Math.pow(1 - st.flipProgress, 3)
        const curRot = 360 * eased

        if (container) {
          container.style.transform = `rotate(${curRot}deg)`
        }

        // Complete flip
        if (st.flipProgress >= 1) {
          st.flipping = false
          st.flipProgress = 0
          st.rotation = 0
          if (container) {
            container.style.transform = `rotate(0deg)`
          }
        }
      } else {
        // NORMAL STATE: Sand flows from top to bottom
        if (st.sandTop > 0 || st.sandBottom < 100) {
          st.sandTop = Math.max(0, st.sandTop - DEFAULT_CONFIG.sandFlowSpeed)
          st.sandBottom = Math.min(100, st.sandBottom + DEFAULT_CONFIG.sandFlowSpeed)
        }
      }

      st.frameCount = (st.frameCount + 1) % 120

      // Trigger flip when sand runs out
      if (!st.flipping && st.sandBottom >= 100) {
        st.flipping = true
        st.frameCount = 0
      }

      // Spawn particles during normal flow
      if (!st.flipping) {
        if (
          engine.getParticleCount() < DEFAULT_CONFIG.maxParticleCount &&
          st.frameCount % DEFAULT_CONFIG.particleSpawnRate === 0
        ) {
          engine.spawnParticle()
        }
        engine.updateParticles()
      }

      // Render frame
      engine.render(
        { sandTop: st.sandTop, sandBottom: st.sandBottom },
        !st.flipping
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animatedSand, resolvedHeight, resolvedWidth])

  return (
    <div className={cn("inline-flex flex-col items-center gap-6 text-[#bd9479]", className)}>
      <div
        ref={containerRef}
        className="relative"
        style={{ width: resolvedWidth, height: resolvedHeight }}
        aria-hidden="true"
      >
        {/* SVG glass frame */}
        <HourglassSVG />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full select-none overflow-hidden"
        />
      </div>

      {message ? (
        <p className={cn("text-xl text-[#5a6b6a]", messageClassName)}>
          {message}
        </p>
      ) : null}
    </div>
  )
}
