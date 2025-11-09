"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hourglass - Simple canvas-based hourglass animation
 * Demonstrates a simpler alternative implementation
 */
export function Hourglass() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  const animationStateRef = useRef({
    sandTopAmount: 100,
    sandBottomAmount: 0,
    isAnimatingFlip: false,
    frameCount: 0,
  })

  type Particle = {
    x: number
    y: number
    life: number
    size: number
    dy: number
  }

  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const topGlassWidth = 100
    const glassHeight = 90
    const neckWidth = 12
    const neckHeight = 25

    const drawGlassOutline = () => {
      ctx.shadowColor = "rgba(255, 223, 0, 0.6)"
      ctx.shadowBlur = 15
      ctx.strokeStyle = "rgba(255, 223, 0, 0.7)"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Top chamber
      ctx.beginPath()
      ctx.moveTo(centerX - topGlassWidth / 2, centerY - glassHeight / 2 - 5)
      ctx.lineTo(centerX + topGlassWidth / 2, centerY - glassHeight / 2 - 5)
      ctx.lineTo(centerX + neckWidth / 2, centerY - neckHeight / 2)
      ctx.lineTo(centerX - neckWidth / 2, centerY - neckHeight / 2)
      ctx.closePath()
      ctx.stroke()

      // Bottom chamber
      ctx.beginPath()
      ctx.moveTo(centerX - neckWidth / 2, centerY + neckHeight / 2)
      ctx.lineTo(centerX + neckWidth / 2, centerY + neckHeight / 2)
      ctx.lineTo(centerX + topGlassWidth / 2, centerY + glassHeight / 2 + 5)
      ctx.lineTo(centerX - topGlassWidth / 2, centerY + glassHeight / 2 + 5)
      ctx.closePath()
      ctx.stroke()

      ctx.shadowColor = "transparent"
    }

    const drawSand = (topAmt: number, botAmt: number) => {
      // Draw top chamber sand
      if (topAmt > 0) {
        const h = (topAmt / 100) * glassHeight
        const ratio = h / glassHeight
        const topY = centerY - glassHeight / 2 - 5
        const bottomY = topY + h

        const gradient = ctx.createLinearGradient(centerX, topY, centerX, bottomY)
        gradient.addColorStop(0, "rgba(240, 200, 120, 0.9)")
        gradient.addColorStop(1, "rgba(210, 158, 64, 0.9)")
        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.moveTo(centerX - topGlassWidth / 2, topY)
        ctx.lineTo(centerX + topGlassWidth / 2, topY)
        ctx.lineTo(
          centerX + neckWidth / 2 + (topGlassWidth / 2 - neckWidth / 2) * (1 - ratio),
          bottomY
        )
        ctx.lineTo(
          centerX - neckWidth / 2 - (topGlassWidth / 2 - neckWidth / 2) * (1 - ratio),
          bottomY
        )
        ctx.closePath()
        ctx.fill()
      }

      // Draw bottom chamber sand
      if (botAmt > 0) {
        const h = (botAmt / 100) * glassHeight
        const ratio = h / glassHeight
        const topY = centerY + neckHeight / 2
        const bottomY = centerY + glassHeight / 2 + 5

        const gradient = ctx.createLinearGradient(centerX, topY, centerX, bottomY)
        gradient.addColorStop(0, "rgba(240, 200, 120, 0.9)")
        gradient.addColorStop(1, "rgba(210, 158, 64, 0.9)")
        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.moveTo(centerX - neckWidth / 2, topY)
        ctx.lineTo(centerX + neckWidth / 2, topY)
        ctx.lineTo(
          centerX + topGlassWidth / 2 - (topGlassWidth / 2 - neckWidth / 2) * (1 - ratio),
          bottomY
        )
        ctx.lineTo(
          centerX - topGlassWidth / 2 + (topGlassWidth / 2 - neckWidth / 2) * (1 - ratio),
          bottomY
        )
        ctx.closePath()
        ctx.fill()
      }
    }

    const drawSparkles = (botAmt: number) => {
      ctx.fillStyle = "rgba(255, 200, 87, 0.6)"
      ctx.font = "italic 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const count = Math.floor(botAmt / 20)

      for (let i = 0; i < count; i++) {
        const x = centerX - 25 + (i % 2) * 50
        const y = centerY + 40 + Math.floor(i / 2) * 20
        ctx.fillText("+", x, y)
      }
    }

    const drawFlowingParticles = () => {
      particlesRef.current.forEach((p, idx) => {
        p.life -= 0.03
        p.y += p.dy

        if (p.life <= 0) {
          particlesRef.current.splice(idx, 1)
        } else {
          ctx.fillStyle = `rgba(210, 158, 64, ${p.life * 0.8})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }

    const drawHourglass = () => {
      ctx.fillStyle = "rgba(255, 250, 240, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const st = animationStateRef.current

      drawGlassOutline()
      drawSand(st.sandTopAmount, st.sandBottomAmount)
      drawFlowingParticles()
      drawSparkles(st.sandBottomAmount)

      // FLIP ANIMATION: Wait for rotation to complete
      if (st.isAnimatingFlip) {
        st.frameCount++

        if (st.frameCount >= 50) {
          // Flip complete - swap sand amounts
          st.isAnimatingFlip = false
          st.frameCount = 0
          const temp = st.sandTopAmount
          st.sandTopAmount = st.sandBottomAmount
          st.sandBottomAmount = temp
          particlesRef.current = []
        }

        return // Exit during flip
      }

      // MAIN FLOW: Sand flows from top to bottom
      if (st.sandTopAmount > 0) {
        st.sandTopAmount = Math.max(0, st.sandTopAmount - 0.4)
        st.sandBottomAmount = Math.min(100, st.sandBottomAmount + 0.4)

        // Spawn particles
        if (st.frameCount % 3 === 0) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 6,
            y: centerY,
            life: 1,
            size: Math.random() * 2 + 1,
            dy: 2,
          })
        }

        st.frameCount++
      } else {
        // Sand depleted - trigger flip
        st.isAnimatingFlip = true
        st.frameCount = 0
        setRotation((prev) => (prev + 180) % 360)
      }
    }

    const animate = () => {
      drawHourglass()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div
        ref={containerRef}
        style={{
          transform: `rotateZ(${rotation}deg)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        <canvas
          ref={canvasRef}
          width={350}
          height={450}
          className="rounded-xl border-4 border-amber-100 bg-amber-50 shadow-2xl"
        />
      </div>
    </div>
  )
}
