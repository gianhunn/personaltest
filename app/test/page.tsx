"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { HourglassLoader } from "@/components/ui/hourglass"
import { useState } from "react"
import { googleSheetsService } from "@/services"
import { cn } from "@/lib/utils"
import {
  genderOptionButtonBaseClass,
  genderOptionButtonSelectedClass,
  genderOptionButtonUnselectedClass,
  primaryRoundedButtonClass,
} from "@/lib/form-styles"
import { TestIntroSection } from "./components/test-intro-section"

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-8 w-8 fill-[#55cec7]`}
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
  { value: -2, stars: 1, label: "Rất không đồng ý", bgColor: "bg-[#bd9479]" },
  { value: -1, stars: 2, label: "Không đồng ý", bgColor: "bg-[#745e4d]" },
  { value: 0, stars: 3, label: "Trung lập", bgColor: "bg-[#745e4d]" },
  { value: 1, stars: 4, label: "Đồng ý", bgColor: "bg-[#433831]" },
  { value: 2, stars: 5, label: "Rất đồng ý", bgColor: "bg-[#433831]" },
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

  const handleContinue = async () => {
    if (selectedRating !== null) {
      const updatedAnswers = { ...answers, [questions[currentQuestion].id]: selectedRating }
      setAnswers(updatedAnswers)

      if (currentQuestion < questions.length - 1) {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
        setSelectedRating(updatedAnswers[questions[nextQuestion].id] ?? null)
      } else {
        // Test completed - save to Google Sheets first, then show loading
        console.log("Test completed", updatedAnswers)

        // Save to Google Sheets using service (only if gender is set)
        if (gender) {
          googleSheetsService.saveTestResults({
            name,
            gender,
            answers: updatedAnswers
          })
        } else {
          console.error('Gender not set, cannot save test results')
        }

        // Show loading screen after initiating save
        setIsLoading(true)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f7f4]">
        <Navigation currentPage="test" />

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-6xl flex-col items-center justify-center px-8 py-16">
          <HourglassLoader message="Chờ chút nhé..." />
        </main>
      </div>
    )
  }

  if (testStarted) {
    const question = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1

    return (
      <div className="min-h-screen bg-[#f8f7f4]">
        <Navigation currentPage="test" />

        <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-full flex-col items-center justify-center px-8 py-16">
          <div className="mb-16 max-w-6xl text-center">
            <h2 className="font-serif text-3xl leading-relaxed tracking-wide text-[#5a6b6a] lg:text-4xl">
              {question.text}
              <br />
              <em className="font-serif">{question.italicText}</em>
            </h2>
          </div>

          <div className="mb-16 flex justify-center gap-5">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRating(option.value)}
                className={`w-[200px] flex flex-col items-center gap-3 rounded-2xl px-8 py-6 transition-all hover:scale-105 ${option.bgColor
                  } ${selectedRating === option.value ? "ring-4 ring-[#BD9479]" : ""}`}
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: option.stars }).map((_, i) => (
                    <Star key={i} filled />
                  ))}
                </div>
                <span className="whitespace-nowrap rounded-full bg-white px-6 py-2 text-sm font-medium text-[#5a6b6a]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex w-full max-w-6xl justify-between">
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
    <div className="min-h-screen bg-[#f8f7f4]">
      <Navigation currentPage="test" />

      <TestIntroSection
        name={name}
        gender={gender}
        onNameChange={setName}
        onGenderChange={setGender}
        onStart={handleStartTest}
      />
    </div>
  )
}
