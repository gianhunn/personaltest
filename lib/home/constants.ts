// Gallery Images
const GALLERY_IMAGE_COUNT = 7
const GALLERY_IMAGE_EXTENSION = ".png"

const generatedGalleryImages = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) =>
  `/images/carousel/${index + 1}${GALLERY_IMAGE_EXTENSION}`,
)

export const GALLERY_IMAGES: ReadonlyArray<string> = Object.freeze(generatedGalleryImages)

// Ellipse Configuration
export const ELLIPSE_CONFIG = {
  height: 260,
  position: -110,
  desktopMinHeight: 600,
} as const

// Carousel Configuration
export const CAROUSEL_CONFIG = {
  autoplayDelay: 2500,
  scrollDuration: 15,
  breakpoint: 768, // md breakpoint
} as const

// Content Data
export const WHY_TAKE_TEST_ITEMS = [
  {
    title: "Tiết kiệm thời gian",
    description:
      "Không phải đắn do giữa các lựa chọn, thay vào đó, bạn có thời gian để lắng nghe và đặt mục tiêu tạo ra phong cách của chính mình",
  },
  {
    title: "Tự tin hơn",
    description:
      "Khi thực sự định hình được bản thân, bạn sẵn sàng thể hiện nhiều khía cạnh của bản thân mình.",
  },
  {
    title: "Chân thật",
    description:
      "Kết quả khẳng định bản chất thật của bạn, không phải con người bạn muốn trở thành",
  },
] as const

export const HOW_TO_ITEMS = [
  {
    title: "Làm bài test",
    description:
      "Đảm bảo bạn trả lời tất cả các câu hỏi trung thực. Và bạn hãy click vào kết quả đầu tiên xuất hiện trong tâm trí của mình.",
  },
  {
    title: "Nhận kết quả",
    description:
      'Kết quả bạn nhận được là tấm bản đồ định hình phong cách thời trang CỦA RIÊNG BẠN, được "may đo" chính xác theo cá tính độc đáo và khai phá cả những tiềm năng phong cách bạn chưa từng biết đến.',
  },
  {
    title: "Khai mở & Tiến bộ",
    description:
      "Nền tảng để bạn nâng cao nhận thức về bản thân, từ đó cải thiện kỹ năng giao tiếp, xây dựng các mối quan hệ chất lượng và biến mục tiêu thành hành động thực tế thông qua tư vấn chuyên sâu hơn.",
  },
] as const

export const NOT_ONLY_YOU_ITEMS = [
  {
    text: "Biết phong cách hợp, nhưng vẫn lo “người ta nghĩ gì”",
  },
  {
    text: "Biết phong cách hợp, nhưng vẫn lo “người ta nghĩ gì”",
  },
  {
    text: "Muốn thể hiện bản thân, nhưng sợ bị khác biệt.",
  },
] as const

export const HOW_TO_GET_CONFIDENT_ITEMS = [
  {
    text: "Tự tin thật không có nghĩa là hoàn hảo hay luôn mạnh mẽ.",
  },
  {
    text: "Mà là hiểu rõ bản thân – dù ai nói gì, bạn vẫn vững vàng.",
  },
  {
    text: "Khi bạn hiểu được giá trị của mình, phong cách, cách nói chuyện và các mối quan hệ sẽ trở nên tự nhiên và có sức hút hơn.",
  }
] as const