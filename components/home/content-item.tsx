import type { ContentItemProps } from "./types"

export function ContentItem({ title, description, className = "" }: ContentItemProps) {
  return (
    <div className={className || undefined}>
      <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">{title}</h3>
      <p className="text-base leading-relaxed text-[#8b7d72] font-serif">{description}</p>
    </div>
  )
}
