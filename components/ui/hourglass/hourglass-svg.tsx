import Image from 'next/image'

/**
 * HourglassSVG - SVG glass frame for the hourglass component
 */
export function HourglassSVG() {
  return (
    <Image
      src="/images/hourglass/hourglass-frame.svg"
      alt="Hourglass loader frame"
      fill
      className="pointer-events-none"
      priority
    />
  )
}
