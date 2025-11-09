import Navigation from "@/components/navigation"
import Image from "next/image"

export default function KetQuaENTPNu() {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="test" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Title and Image */}
          <div className="space-y-8">
            <h1 className="font-serif text-6xl lg:text-7xl text-[#4a5f6d] leading-tight">
              BẠN LÀ <span className="italic">ENTP</span>
              <br />
              <span className="italic">-NỮ</span>
            </h1>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/two-fashion-models-in-bold-blue-and-red-striped-ou.jpg"
                alt="ENTP Fashion Style"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Description and Image */}
          <div className="space-y-8">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/woman-in-blue-oversized-coat-with-orange-bag-again.jpg"
                alt="ENTP Style"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[#4a5f6d] text-lg leading-relaxed">
              Bạn mang năng lượng của sự tự do – thông minh, phá cách và chẳng bao giờ chịu "đúng yêu". Phong cách của
              bạn là lời tuyên ngôn ngầm: "Tôi sống theo cách của tôi."
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section with Background */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/close-up-fashion-photo-person-wearing-sunglasses-a.jpg"
          alt="Style Statement"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-6">
          <h2 className="font-serif text-4xl lg:text-5xl text-white text-center max-w-5xl leading-relaxed">
            Style của bạn nói lên: Tôi không chạy theo công thức – tôi tạo ra phiên bản riêng của mọi xu hướng
          </h2>
        </div>
      </section>

      {/* Style Guide Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="space-y-16">
          {/* Title */}
          <h2 className="font-serif text-5xl lg:text-6xl text-[#4a5f6d] leading-tight">
            Creative
            <br />
            Rebel &<br />
            Effortless
            <br />
            Statement
          </h2>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-12">
              {/* Color Palette */}
              <div className="space-y-6">
                <h3 className="font-serif text-3xl text-[#BD9479]">Gam màu chủ đạo</h3>
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-[#6b9ac4]" />
                  <div className="w-32 h-32 bg-[#b8d4e8]" />
                  <div className="w-32 h-32 bg-[#c8342e]" />
                </div>
                <p className="text-[#4a5f6d] leading-relaxed">
                  beige, đỏ cam, xanh cobalt – vừa nổi vừa tinh tế. Item "đỉnh": blazer oversize, quần jeans ống suông,
                  áo phông in chữ. Phụ kiện: khuyên tai bản to, sneaker chunky, túi tote canvas phá cách.
                </p>
              </div>

              {/* Top Image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/woman-in-red-jacket-and-bright-blue-wide-leg-pants.jpg"
                  alt="Mix & Match Style"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Mix & Matcha */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-[#BD9479]">Mix & matcha</h3>
                <p className="text-[#4a5f6d] leading-relaxed">
                  Bạn thích mix & match ngẫu hứng – một chiếc blazer nghiêm túc phối cùng sneaker nổi bật, hay một đôi
                  khuyên tai to bản kết hợp với tóc búi tự nhiên. Mọi thứ trông như ngẫu nhiên, nhưng lại rất "ra chất
                  bạn".
                </p>
              </div>

              {/* Bottom Image */}
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/woman-in-red-oversized-shirt-and-blue-jeans-fashio.jpg"
                  alt="Outfit Suggestion"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Outfit Suggestion */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-[#BD9479]">Gợi ý phối đồ</h3>
                <p className="text-[#4a5f6d] leading-relaxed">
                  Blazer sáng màu + áo thun in logo + quần jeans ống suông + sneaker trắng + khuyên tai bạc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
