import type { HeroContentProps } from "./types"

export function HeroContent({ className = "", showBottomMargin = false }: HeroContentProps) {
  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center">
          <p className="text-sm tracking-widest text-[#8b7d72] mb-4 font-serif">
            KHÁM PHÁ
          </p>
          <h1 className="text-4xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light mb-4 text-balance">
            PHONG CÁCH ĐỘC BẢN CỦA RIÊNG BẠN
          </h1>
          <p className={`text-base text-[#8b7d72] font-serif ${showBottomMargin ? "mb-2" : ""}`}>
            dành cho 22 tuổi trở lên
          </p>
        </div>
      </div>
    </div>
  )
}
