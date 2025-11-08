"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-8 w-8 ${filled ? "fill-[#BD9479]" : "fill-gray-300"}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

const questions = [
  {
    id: 1,
    text: "Trong các buổi gặp gỡ hoặc sự kiện đông người, ",
    italicText: "bạn thường nhanh chòng hoà nhập, thích trò chuyện với nhiều người mới.",
  },
  {
    id: 2,
    text: "Khi mệt mỏi hoặc cần nạp năng lượng, ",
    italicText: "bạn thường muốn ở yên một mình để tĩnh tâm, nghỉ ngơi hoặc làm điều mình thích.",
  },
  {
    id: 3,
    text: "Khi làm việc nhóm, ",
    italicText: "bạn cảm thấy thoải mái hơn khi nói ra ý tưởng, thảo luận cùng mọi người để tìm giải pháp.",
  },
  {
    id: 4,
    text: "Khi học hoặc làm việc, ",
    italicText: "bạn có xu hướng muốn hiểu bức tranh tổng thể trước rồi mới đi vào chi tiết.",
  },
  {
    id: 5,
    text: "Khi quan sát sự việc, ",
    italicText:
      "bạn thường tập trung vào ý nghĩa, thông điệp hoặc lý do ẩn sau nó.hơn là quan tâm nó diễn ra như thế nào, ai làm, kết quả ra sao.",
  },
  {
    id: 6,
    text: "Trước một ý tưởng mới, ",
    italicText:
      "bạn thường hứng thú với sự sáng tạo, độc đáo, dù còn nhiều mơ hồ hơn là xem xét tính khả thi, thực tế có làm được không.",
  },
  {
    id: 7,
    text: "Khi ra quyết định quan trọng, ",
    italicText:
      "bạn ưu tiên việc cân nhắc cảm xúc, giá trị cá nhân và sự ảnh hưởng đến người khác hơn suy nghĩ logic, dựa trên lý do và dữ kiện rõ ràng.",
  },
  {
    id: 8,
    text: "Khi người khác mắc lỗi, ",
    italicText:
      "bạn có xu hướng góp ý thẳng thắn để họ hiểu vấn đề và sửa sai, ngay cả khi điều đó có thể khiến người khác không vui.",
  },
  {
    id: 9,
    text: "Trong xung đột hoặc tranh luận, ",
    italicText:
      "bạn thường muốn tìm ra ai đúng - ai sai để giải quyết rõ ràng hơn việc tìm cách duy trì hoà khí, tìm cách dung hoà để mọi người cùng vui.",
  },
  {
    id: 10,
    text: "Khi có công việc hoặc mục tiêu, ",
    italicText: "bạn thường lập kế hoạch, sắp xếp thứ tự và cố gắng hoàn thành đúng hạn.",
  },
  {
    id: 11,
    text: "Bạn thấy thoải mái hơn khi ngày trôi tự nhiên, ",
    italicText: "bạn tự do chọn làm điều mình thích.",
  },
  {
    id: 12,
    text: "Trong công việc hoặc dự án, ",
    italicText: "bạn thích giữ mọi thứ linh hoạt để dễ thay đổi khi cần.",
  },
]

const ratingOptions = [
  { value: 1, label: "Rất không đồng ý", bgColor: "bg-[#fef9e7]" },
  { value: 2, label: "Không đồng ý", bgColor: "bg-[#f4f9d0]" },
  { value: 3, label: "Trung lập", bgColor: "bg-[#d4f4dd]" },
  { value: 4, label: "Đồng ý", bgColor: "bg-[#a8e6cf]" },
  { value: 5, label: "Rất đồng ý", bgColor: "bg-[#7ee8b4]" },
]

export default function TestPage() {
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleStartTest = () => {
    if (name && gender) {
      setTestStarted(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      if (selectedRating !== null) {
        setAnswers({ ...answers, [questions[currentQuestion].id]: selectedRating })
      }

      const prevQuestion = currentQuestion - 1
      setCurrentQuestion(prevQuestion)
      setSelectedRating(answers[questions[prevQuestion].id] ?? null)
    } else {
      if (selectedRating !== null) {
        setAnswers({ ...answers, [questions[currentQuestion].id]: selectedRating })
      }
      setTestStarted(false)
    }
  }

  const handleContinue = () => {
    if (selectedRating !== null) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedRating })

      if (currentQuestion < questions.length - 1) {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
        setSelectedRating(answers[questions[nextQuestion].id] ?? null)
      } else {
        setIsLoading(true)
        console.log("Test completed", { ...answers, [questions[currentQuestion].id]: selectedRating })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f3ed]">
        <Navigation currentPage="test" />

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl flex-col items-center justify-center px-8 py-16">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-16 w-16 animate-bounce rounded-lg bg-[#BD9479] [animation-delay:-0.3s]" />
            <div className="h-16 w-16 animate-bounce rounded-lg bg-[#5dc9c9] [animation-delay:-0.15s]" />
            <div className="h-16 w-16 animate-bounce rounded-lg bg-[#a8e6cf]" />
            <div className="h-16 w-16 animate-bounce rounded-lg bg-[#7ee8b4] [animation-delay:-0.15s]" />
            <div className="h-16 w-16 animate-bounce rounded-lg bg-[#8dd9e8] [animation-delay:-0.3s]" />
          </div>
          <p className="font-serif text-2xl text-[#5a6b6a]">Chờ chút nhé...</p>
        </main>
      </div>
    )
  }

  if (testStarted) {
    const question = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1

    return (
      <div className="min-h-screen bg-[#f5f3ed]">
        <Navigation currentPage="test" />

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl flex-col items-center justify-center px-8 py-16">
          <div className="mb-16 max-w-4xl text-center">
            <h2 className="font-serif text-3xl leading-relaxed tracking-wide text-[#5a6b6a] lg:text-4xl">
              {question.text}
              <em className="font-serif">{question.italicText}</em>
            </h2>
          </div>

          <div className="mb-16 flex flex-wrap justify-center gap-4">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRating(option.value)}
                className={`flex flex-col items-center gap-3 rounded-2xl px-8 py-6 transition-all hover:scale-105 ${
                  option.bgColor
                } ${selectedRating === option.value ? "ring-4 ring-[#BD9479]" : ""}`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < option.value} />
                  ))}
                </div>
                <span className="whitespace-nowrap rounded-full bg-white px-6 py-2 text-sm font-medium text-[#5a6b6a]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex w-full max-w-4xl justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-lg text-[#5a6b6a] underline hover:bg-transparent hover:text-[#BD9479]"
            >
              Quay lại
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selectedRating === null}
              variant="ghost"
              className="text-lg text-[#5a6b6a] underline hover:bg-transparent hover:text-[#BD9479] disabled:opacity-50"
            >
              {isLastQuestion ? "Kết thúc" : "Tiếp tục"}
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ed]">
      <Navigation currentPage="test" />

      <main className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-center justify-center overflow-hidden">
          <div className="relative h-full w-full">
            <img
              src="/stylish-woman-with-sunglasses-and-white-head-wrap-.jpg"
              alt="Stylish fashion photo"
              className="h-full w-full object-cover"
              style={{
                clipPath:
                  "polygon(0 0, 85% 0, 95% 5%, 90% 15%, 95% 25%, 88% 35%, 93% 45%, 87% 55%, 92% 65%, 86% 75%, 91% 85%, 85% 95%, 90% 100%, 0 100%)",
              }}
            />
            <p className="absolute bottom-8 left-8 text-sm text-white/80">Styled by Polina Tankilevitch</p>
          </div>
        </div>

        <div className="flex items-center justify-center px-8 py-16 lg:px-16">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl tracking-wide text-[#5a6b6a] lg:text-5xl">Tên của bạn là</h1>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-lg border-none bg-white px-6 text-lg shadow-sm"
                placeholder=""
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-4xl tracking-wide text-[#5a6b6a] lg:text-5xl">Giới tính</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setGender("male")}
                  className={`h-14 rounded-lg text-lg ${
                    gender === "male"
                      ? "bg-[#BD9479] text-white hover:bg-[#BD9479]"
                      : "bg-white text-[#6b7280] hover:bg-gray-50"
                  }`}
                >
                  Nam
                </Button>
                <Button
                  onClick={() => setGender("female")}
                  className={`h-14 rounded-lg text-lg ${
                    gender === "female"
                      ? "bg-[#BD9479] text-white hover:bg-[#BD9479]"
                      : "bg-white text-[#6b7280] hover:bg-gray-50"
                  }`}
                >
                  Nữ
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleStartTest}
                disabled={!name || !gender}
                className="h-14 w-full rounded-lg bg-white text-lg text-[#6b7280] hover:bg-gray-50 disabled:opacity-50"
              >
                Bắt đầu test
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
