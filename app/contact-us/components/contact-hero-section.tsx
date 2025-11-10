export function ContactHeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 transform bg-no-repeat bg-[length:140%_auto] sm:bg-[length:120%_auto] lg:bg-[length:100%_auto] bg-[position:center_-10rem] sm:bg-[position:center_-12rem] lg:bg-[position:center_-16rem] bg-[url('/images/contact-us/contact-us-background.jpg')] scale-x-[-1]"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#f8f7f4]/65" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-8 sm:py-20 md:px-16 lg:px-32 xl:px-48">
        <div className="w-full max-w-5xl space-y-8 text-center sm:text-left">
          <p className="font-sans text-[#4f4239]/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Đăng ký phân tích
          </p>
          <div className="mt-4 text-[#4f4239]">
            <p className="font-sans text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:whitespace-nowrap">
              <span className="font-bold text-[1.05em] sm:text-[1.15em] md:text-[1.2em] lg:text-[1.25em] xl:text-[1.3em]">
                CÁ NHÂN
              </span>{" "}
              <span className="font-normal">để giải đáp!</span>
            </p>
          </div>

          <div className="mt-12 space-y-6 text-[#4f4239] sm:mt-14">
            <p className="font-sans text-base font-semibold underline decoration-2 underline-offset-4 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              ĐĂNG KÝ NGAY!
            </p>
            <p className="font-sans text-sm tracking-[0.2em] text-[#4f4239]/80 sm:text-base md:text-lg lg:text-xl xl:text-2xl uppercase">
              ONLINE VÀ FREE
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
