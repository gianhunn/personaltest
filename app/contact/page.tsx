import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="contact" />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="mb-6 font-serif text-5xl tracking-wide text-[#7ba89f]">Contact us</h1>
            <p className="text-lg leading-relaxed text-[#6b7280]">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#6b7280]">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-[#d4cfc0] bg-[#f5f3ed] px-4 py-3 text-[#6b7280] focus:border-[#BD9479] focus:outline-none focus:ring-2 focus:ring-[#BD9479]/20"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#6b7280]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-[#d4cfc0] bg-[#f5f3ed] px-4 py-3 text-[#6b7280] focus:border-[#BD9479] focus:outline-none focus:ring-2 focus:ring-[#BD9479]/20"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#6b7280]">
                  Chủ đề
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-lg border border-[#d4cfc0] bg-[#f5f3ed] px-4 py-3 text-[#6b7280] focus:border-[#BD9479] focus:outline-none focus:ring-2 focus:ring-[#BD9479]/20"
                  placeholder="Bạn muốn liên hệ về vấn đề gì?"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#6b7280]">
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-lg border border-[#d4cfc0] bg-[#f5f3ed] px-4 py-3 text-[#6b7280] focus:border-[#BD9479] focus:outline-none focus:ring-2 focus:ring-[#BD9479]/20"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                />
              </div>

              <Button className="w-full rounded-full bg-[#BD9479] py-6 text-lg text-white hover:bg-[#BD9479]">
                Gửi Tin Nhắn
              </Button>
            </form>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-3xl text-[#BD9479]">📧</div>
              <h3 className="mb-2 font-medium text-[#6b7280]">Email</h3>
              <p className="text-sm text-[#6b7280]">contact@personaltest.com</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl text-[#BD9479]">📱</div>
              <h3 className="mb-2 font-medium text-[#6b7280]">Điện thoại</h3>
              <p className="text-sm text-[#6b7280]">+84 123 456 789</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-3xl text-[#BD9479]">📍</div>
              <h3 className="mb-2 font-medium text-[#6b7280]">Địa chỉ</h3>
              <p className="text-sm text-[#6b7280]">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
