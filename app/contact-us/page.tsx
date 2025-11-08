import Navigation from "@/components/navigation"

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-11-02%20at%2000.54.17%402x-J6n7TxBXFr6RMwsTEdgySVWmcipgWU.png')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-16 lg:px-24">
          <div className="w-full max-w-4xl">
            <h1 className="font-serif font-bold leading-tight text-[#6b5d52] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              100 SUẤT CỐ VẤN CÁ NHÂN – MIỄN PHÍ 100%
            </h1>

            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4 md:mt-12">
              <p className="font-serif text-xl font-bold text-[#6b5d52] underline decoration-2 underline-offset-4 sm:text-2xl md:text-3xl lg:text-4xl">
                ĐĂNG KÝ NGAY!
              </p>
              <p className="font-sans text-base text-[#6b5d52]/80 sm:text-lg md:text-xl lg:text-2xl">
                60–90 PHÚT CỐ VẤN 1:1, ONLINE VÀ RIÊNG TƯ
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
