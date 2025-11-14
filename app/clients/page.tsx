import { Navigation } from "@/components/navigation"

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="clients" />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="mb-6 text-5xl tracking-wide text-[#7ba89f]">Avis Clients</h1>
            <p className="text-lg leading-relaxed text-[#6b7280]">
              Khám phá những chia sẻ từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-[#BD9479]">
                <span className="text-2xl">★★★★★</span>
              </div>
              <p className="mb-4 leading-relaxed text-[#6b7280]">
                "Bài test rất chính xác và giúp tôi hiểu rõ hơn về bản thân. Tôi đã tìm được phong cách phù hợp với tính
                cách của mình. Cảm ơn Personal Test!"
              </p>
              <div className="border-t border-[#d4cfc0] pt-4">
                <p className="font-medium text-[#6b7280]">Nguyễn Minh Anh</p>
                <p className="text-sm text-[#6b7280]">25 tuổi, Hà Nội</p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-[#BD9479]">
                <span className="text-2xl">★★★★★</span>
              </div>
              <p className="mb-4 leading-relaxed text-[#6b7280]">
                "Tôi rất ấn tượng với độ chính xác của bài test. Kết quả phản ánh đúng tính cách và sở thích của tôi.
                Đây là công cụ tuyệt vời để khám phá bản thân."
              </p>
              <div className="border-t border-[#d4cfc0] pt-4">
                <p className="font-medium text-[#6b7280]">Trần Văn Hùng</p>
                <p className="text-sm text-[#6b7280]">28 tuổi, TP.HCM</p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-[#BD9479]">
                <span className="text-2xl">★★★★★</span>
              </div>
              <p className="mb-4 leading-relaxed text-[#6b7280]">
                "Bài test dễ làm và kết quả rất chi tiết. Tôi đã học được nhiều điều về phong cách cá nhân và cách thể
                hiện bản thân một cách tự tin hơn."
              </p>
              <div className="border-t border-[#d4cfc0] pt-4">
                <p className="font-medium text-[#6b7280]">Lê Thị Hương</p>
                <p className="text-sm text-[#6b7280]">26 tuổi, Đà Nẵng</p>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-1 text-[#BD9479]">
                <span className="text-2xl">★★★★★</span>
              </div>
              <p className="mb-4 leading-relaxed text-[#6b7280]">
                "Một trải nghiệm tuyệt vời! Bài test không chỉ giúp tôi hiểu về phong cách của mình mà còn gợi ý cách
                phát triển và hoàn thiện bản thân."
              </p>
              <div className="border-t border-[#d4cfc0] pt-4">
                <p className="font-medium text-[#6b7280]">Phạm Đức Anh</p>
                <p className="text-sm text-[#6b7280]">30 tuổi, Cần Thơ</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
