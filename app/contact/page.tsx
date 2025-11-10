import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="about" />

      <main className="relative h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/stylish-woman-with-sunglasses-and-white-head-wrap-.jpg)",
            backgroundPosition: "center right",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content overlay */}
        <div className="relative flex h-full flex-col items-start justify-center px-12 md:px-16 lg:px-20">
          <div className="max-w-2xl space-y-6">
            {/* Main heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#5a5a5a] leading-tight">
              Đăng ký phân tích <br /> CÁ NHÂN để giải đáp!
            </h1>

            {/* CTA Section */}
            <div className="space-y-4 pt-4">
              {/* Primary CTA Button */}
              <a
                href="/contact"
                className="inline-block bg-[#a98b7e] hover:bg-[#9a7d71] transition-colors px-8 py-3 rounded-full text-white font-medium text-lg"
              >
                ĐĂNG KÝ NGAY!
              </a>

              {/* Secondary text */}
              <p className="text-[#6b7280] font-light tracking-wide text-sm">ONLINE VÀ FREE</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
