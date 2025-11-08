import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="about" />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="mb-6 font-serif text-5xl tracking-wide text-[#7ba89f]">Về Chúng Tôi</h1>
            <p className="text-lg leading-relaxed text-[#6b7280]">
              Personal Test, Inc. là nền tảng hàng đầu giúp bạn khám phá phong cách và tính cách độc đáo của riêng mình.
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-serif text-2xl text-[#7ba89f]">Sứ Mệnh Của Chúng Tôi</h2>
              <p className="leading-relaxed text-[#6b7280]">
                Chúng tôi tin rằng mỗi người đều có một phong cách độc đáo riêng. Sứ mệnh của chúng tôi là giúp bạn khám
                phá và phát triển phong cách cá nhân, từ đó tự tin thể hiện bản thân một cách chân thực nhất.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-serif text-2xl text-[#7ba89f]">Phương Pháp Của Chúng Tôi</h2>
              <p className="leading-relaxed text-[#6b7280]">
                Bài test của chúng tôi được phát triển dựa trên nghiên cứu tâm lý học và phân tích hành vi. Chúng tôi
                kết hợp các yếu tố về tính cách, sở thích và giá trị cá nhân để tạo ra một bức tranh toàn diện về phong
                cách của bạn.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-serif text-2xl text-[#7ba89f]">Cam Kết Của Chúng Tôi</h2>
              <p className="leading-relaxed text-[#6b7280]">
                Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và cung cấp kết quả chính xác, khách quan. Mọi dữ
                liệu được mã hóa và chỉ được sử dụng để cải thiện trải nghiệm của bạn.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
