"use client"

import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [autoScroll, setAutoScroll] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScroll((prev) => (prev + 1) % 6)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const galleryImages = [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop",
  ]

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Navigation currentPage="home" />

      {/* Hero Section with Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Image Gallery */}
          <div className="flex gap-5 mb-16 overflow-x-auto pb-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-60 h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Fashion ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Hero Content */}
          <div className="text-center">
            <p className="text-sm tracking-widest text-[#8b7d72] mb-4 font-serif">KHÁM PHÁ</p>
            <h1 className="text-5xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light mb-4 text-balance">
              PHONG CÁCH ĐỘC BẢN CỦA RIÊNG BẠN
            </h1>
            <p className="text-base text-[#8b7d72] font-serif">dành cho 22 tuổi trở lên</p>
          </div>
        </div>
      </section>

      {/* Why Take Test Section */}
      <section className="py-20 border-t border-[#d4c9bf]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Tiết kiệm thời gian</h3>
                <p className="text-base leading-relaxed text-[#8b7d72] font-serif">
                  Không phải đắn do giữa các lựa chọn, thay vào đó, bạn có thời gian để lắng nghe và đặt mục tiêu tạo ra
                  phong cách của chính mình
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Tự tin hơn</h3>
                <p className="text-base leading-relaxed text-[#8b7d72] font-serif">
                  Khi thực sự định hình được bản thân, bạn sẵn sàng thể hiện nhiều khía cạnh của bản thân mình.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Chân thật</h3>
                <p className="text-base leading-relaxed text-[#8b7d72] font-serif">
                  Kết quả khẳng định bản chất thật của bạn, không phải con người bạn muốn trở thành
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <h2 className="text-5xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light text-balance leading-tight">
                VÌ SAO NÊN LÀM TEST?
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-20 border-t border-[#d4c9bf]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl tracking-wide text-[#6b5d52] font-serif font-light mb-16">
            LÀM THẾ NÀO?
          </h2>

          <div className="space-y-12 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Làm bài test</h3>
              <p className="text-base leading-relaxed text-[#8b7d72] font-serif max-w-2xl">
                Đảm bảo bạn trả lời tất cả các câu hỏi trung thực. Và bạn hãy click vào kết quả đầu tiên xuất hiện trong
                tâm trí của mình.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Nhận kết quả</h3>
              <p className="text-base leading-relaxed text-[#8b7d72] font-serif max-w-2xl">
                Kết quả bạn nhận được là tấm bản đồ định hình phong cách thời trang CỦA RIÊNG BẠN, được "may đo" chính
                xác theo cá tính độc đáo và khai phá cả những tiềm năng phong cách bạn chưa từng biết đến.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#6b5d52] mb-3 font-serif">Khai mở & Tiến bộ</h3>
              <p className="text-base leading-relaxed text-[#8b7d72] font-serif max-w-2xl">
                Nền tảng để bạn nâng cao nhận thức về bản thân, từ đó cải thiện kỹ năng giao tiếp, xây dựng các mối quan
                hệ chất lượng và biến mục tiêu thành hành động thực tế thông qua tư vấn chuyên sâu hơn.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/ket-qua-entp-nu"
              className="inline-block px-10 py-3 border-2 border-[#6b5d52] text-[#6b5d52] font-serif text-base tracking-widest uppercase transition-all hover:bg-[#6b5d52] hover:text-white"
            >
              TEST NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
