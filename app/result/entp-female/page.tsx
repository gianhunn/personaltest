import Navigation from "@/components/navigation"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kết quả ENTP - Người có tầm nhìn xa | Personal Test",
  description: "Khám phá phong cách thời trang phù hợp với tính cách ENTP - Effortless Rebel, phá cách nhưng tự nhiên",
}

// Constants
const PERSONALITY_TYPE = "ENTP"
const PERSONALITY_TITLE = "Người có tầm nhìn xa"
const STYLE_NAME = "Effortless Rebel"
const STYLE_DESCRIPTION = "Phá cách những vẫn tự nhiên"

const PERSONALITY_DIMENSIONS = [
  { en: "Extraversion", vi: "Hướng ngoài" },
  { en: "INtuition", vi: "Trực giác" },
  { en: "Thinking", vi: "Lý trí" },
  { en: "Perceiving", vi: "Nhận thức linh hoạt" },
] as const

const DESCRIPTION_BULLETS = [
  {
    bold: "Ngẫu hứng, dí dỏm và tràn đầy năng lượng - Yêu thử thách, thích phiêu lưu tinh thần",
    regular: " - bạn say mê những hành trình mới, những cuộc trò chuyện sâu và cơ hội bung sức sáng tạo.",
  },
  {
    bold: "Chân thành và ấm áp",
    regular: " - hoạt ngôn nhưng biết lắng nghe, dễ đồng cảm và luôn sẵn lòng giúp đỡ.",
  },
  {
    bold: "Hơi vụng về nhưng duyên dáng",
    regular: " - có thể quên vài chi tiết nhỏ, nhưng chính sự hồn nhiên và thật lòng khiến ai cũng thấy dễ chịu khi ở bên bạn.",
  },
] as const

const OUTFIT_IMAGES = [
  {
    src: "/effortless-rebel-outfit-tan-blazer.jpg",
    alt: "Phong cách ENTP - Áo blazer màu be phối với quần jeans",
  },
  {
    src: "/effortless-rebel-outfit-blue-shirt.jpg",
    alt: "Phong cách ENTP - Áo sơ mi xanh dương phong cách",
  },
  {
    src: "/effortless-rebel-outfit-white-pants.jpg",
    alt: "Phong cách ENTP - Quần trắng phối với áo blazer",
  },
] as const

const COLOR_PALETTE = ["#b8b5ad", "#f5a456", "#a0613f", "#2d4a6b"] as const

const STYLE_GUIDE_ITEMS = [
  {
    title: "Chất liệu",
    description: "Cotton, denim, da, vải thô, linen, tơ",
    iconBg: "bg-black",
  },
  {
    title: "Phụ kiện",
    description: "Khuyên tai bản to, sneaker chunky, túi tote canvas",
    iconBg: "bg-[#c9b5a0]",
  },
  {
    title: "Công thức phối khác",
    description: "Blazer sáng màu + áo thun in logo + quần jeans ống suông + sneaker trắng + khuyên tai bạc",
    iconBg: "bg-[#8b6f47]",
  },
] as const

export default function KetQuaENTPNu() {
  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="test" />

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Title and Description */}
          <div className="space-y-8">
            <header>
              <h1 className="font-serif text-6xl lg:text-7xl text-[#5a5a5a] leading-tight">
                BẠN LÀ <span className="text-[#9b8b7e] italic">{PERSONALITY_TYPE}</span>
              </h1>
              <p className="font-serif text-4xl lg:text-5xl text-[#5a5a5a] mt-2 italic">{PERSONALITY_TITLE}</p>
            </header>

            {/* Description bullets */}
            <ul className="space-y-2 text-[#5a5a5a] list-none">
              {DESCRIPTION_BULLETS.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-xl" aria-hidden="true">•</span>
                  <div>
                    <span className="font-semibold">{bullet.bold}</span>
                    <span className="text-sm leading-relaxed">{bullet.regular}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Personality Dimensions */}
          <aside className="space-y-8 flex flex-col justify-center items-end" aria-label="Các đặc điểm tính cách">
            <dl className="space-y-6">
              {PERSONALITY_DIMENSIONS.map((dimension, index) => (
                <div key={index}>
                  <dt className="text-2xl font-semibold text-[#5a5a5a] text-end">{dimension.en}</dt>
                  <dd className="text-sm text-[#999] text-end">({dimension.vi})</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Style Section - Effortless Rebel */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="font-serif text-5xl lg:text-6xl text-[#5a5a5a] mb-4">
          <span className="italic">{STYLE_NAME}</span>
        </h2>
        <p className="text-xl text-[#5a5a5a] mb-12">{STYLE_DESCRIPTION}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {OUTFIT_IMAGES.map((outfit, index) => (
            <div key={index} className="relative aspect-[3/4] w-full">
              <Image
                src={outfit.src}
                alt={outfit.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover rounded-lg"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Style Guide - Phối Trạng Phục */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="font-serif text-4xl text-[#9b8b7e] italic mb-12">GỢI Ý PHỐI TRẠNG PHỤC</h3>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Outfit and Color Palette */}
          <div className="space-y-8">
            <div className="flex gap-3 mb-8" role="list" aria-label="Bảng màu phong cách">
              {COLOR_PALETTE.map((color, index) => (
                <div
                  key={index}
                  className="w-20 h-20 rounded-lg"
                  style={{ backgroundColor: color }}
                  role="listitem"
                  aria-label={`Màu ${index + 1}`}
                />
              ))}
            </div>

            {/* Outfit Example */}
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/blazer-jeans-outfit-style-guide.jpg"
                alt="Hướng dẫn phối đồ ENTP - Blazer và quần jeans"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Materials and Accessories Guide */}
          <div className="space-y-6">
            <div className="bg-[#6b7a7f] text-white p-6 rounded-lg space-y-4">
              {STYLE_GUIDE_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${index < STYLE_GUIDE_ITEMS.length - 1 ? "pb-4 border-b border-white/20" : ""}`}
                >
                  <div className={`w-16 h-16 ${item.iconBg} rounded-lg flex-shrink-0`} aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section with Background */}
      <section className="relative h-[600px] w-full" aria-label="Tuyên ngôn phong cách">
        <Image
          src="/fashion-lifestyle-hands-desk-workspace.jpg"
          alt="Không gian làm việc và phong cách sống"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-6">
          <blockquote className="max-w-5xl">
            <h2 className="font-serif text-4xl lg:text-5xl text-white text-center leading-relaxed mb-8 italic">
              Tôi không chạy theo công thức. Tôi tạo ra phiên bản riêng của mọi xu hướng.
            </h2>
            <p className="text-white text-center max-w-3xl leading-relaxed text-lg">
              Bạn mang năng lượng của sự tự do – thông minh, phá cách và chẳng bao giờ chịu "đúng yêu". Phong cách của bạn
              là lời tuyên ngôn ngầm: "Tôi sống theo cách của tôi."
              <br />
              <br />
              Bạn thích mix & match ngẫu hứng – một chiếc blazer nghiêm túc phối cùng sneaker nổi bật, hay một đôi khuyên
              tai to bản kết hợp với tóc búi tự nhiên. Mọi thứ trông như ngẫu nhiên, nhưng lại rất "ra chất bạn".
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  )
}
