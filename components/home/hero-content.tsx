import type { HeroContentProps } from "./types"

export function HeroContent({ className = "", showBottomMargin = false }: HeroContentProps) {
  return (
    <div className={className}>
      <div className="max-w-8xl mx-auto px-6 w-full">
        <div className="text-center">
          <p className="mb-4 text-4xl tracking-widest text-[#8b7d72]">
            KHÁM PHÁ
          </p>
          <h1 className="mb-4 text-4xl font-light text-[#6b5d52] md:text-6xl">
            PHONG CÁCH ĐỘC BẢN CỦA RIÊNG BẠN
          </h1>
          <p className={`text-3xl text-[#8b7d72] ${showBottomMargin ? "mb-2" : ""}`}>
            dành cho 22 tuổi trở lên
          </p>
        </div>
      </div>
    </div>
  )
}
