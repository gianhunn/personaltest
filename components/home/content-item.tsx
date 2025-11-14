import type { ContentItemProps } from "./types"

export function ContentItem({ title, description, className = "" }: ContentItemProps) {
  return (
    <div className={className || undefined}>
      <h3 className="mb-3 text-2xl font-semibold text-[#6b5d52]">{title}</h3>
      <p className="text-xl leading-relaxed text-[#8b7d72]">{description}</p>
    </div>
  )
}
