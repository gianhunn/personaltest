"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { HourglassLoader } from "@/components/ui/hourglass"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { googleSheetsService, emailService } from "@/services"
import { TestIntroSection } from "./components/test-intro-section"
import stylesData from "@/lib/data/styles.json"
import type { StylesData } from "@/lib/data/types"

type Gender = "male" | "female"

const typedStylesData = stylesData as StylesData

function calculatePersonalityType(answers: Record<number, number>): string {
  let E_I = 0
  let S_N = 0
  let T_F = 0
  let J_P = 0

  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const answer = Number(answerValue)
    const qId = parseInt(questionId, 10)

    if (qId === 1) E_I += answer
    if (qId === 2) E_I -= answer
    if (qId === 3) T_F += answer
    if (qId === 4) S_N -= answer
    if (qId === 5) S_N -= answer
    if (qId === 6) S_N -= answer
    if (qId === 7) T_F -= answer
    if (qId === 8) T_F += answer
    if (qId === 9) T_F += answer
    if (qId === 10) J_P += answer
    if (qId === 11) J_P -= answer
    if (qId === 12) J_P -= answer
  })

  const personality = {
    E_I: E_I >= 0 ? "E" : "I",
    S_N: S_N >= 0 ? "S" : "N",
    T_F: T_F >= 0 ? "T" : "F",
    J_P: J_P >= 0 ? "J" : "P",
  }

  return `${personality.E_I}${personality.S_N}${personality.T_F}${personality.J_P}`
}

function getStyleIndexForGender(styleKey: string, gender: Gender): number {
  const styleEntry = (typedStylesData as Record<string, any>)[styleKey]

  if (!styleEntry) {
    console.error(`Style data not found for key: ${styleKey}`)
    return 0
  }

  if (Array.isArray(styleEntry)) {
    const matchedIndex = styleEntry.findIndex((entry) => entry.gender === gender)
    return matchedIndex >= 0 ? matchedIndex : 0
  }

  return 0
}

function getStyleDataForSelection(styleKey: string, gender: Gender) {
  const styleEntry = (typedStylesData as Record<string, any>)[styleKey]

  if (!styleEntry) {
    console.error(`Style data not found for key: ${styleKey}`)
    return null
  }

  if (Array.isArray(styleEntry)) {
    const matchedStyle = styleEntry.find((entry) => entry.gender === gender)
    return matchedStyle ?? styleEntry[0] ?? null
  }

  return styleEntry
}

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
    italicText: "bạn thường nhanh chóng hoà nhập, thích trò chuyện với nhiều người mới.",
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
      "bạn thường tập trung vào ý nghĩa, thông điệp hoặc lý do ẩn sau nó hơn là quan tâm nó diễn ra như thế nào, ai làm, kết quả ra sao.",
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
  const router = useRouter()
  const [name, setName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [urlCode, setUrlCode] = useState<string | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)

    // Get code from URL params on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      if (code) {
        setUrlCode(code)
      }
    }
  }, [])

  const handleStartTest = () => {
    if (name && gender) {
      setTestStarted(true)
      setTestCompleted(false) // Reset completion state
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
      setTestCompleted(false) // Reset completion state when going back
    } else {
      if (selectedRating !== null) {
        setAnswers({ ...answers, [questions[currentQuestion].id]: selectedRating })
      }
      setTestStarted(false)
      setTestCompleted(false) // Reset completion state
    }
  }

  const questionRef = useRef<HTMLDivElement | null>(null)

  const scrollToQuestion = () => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleContinue = async (nextRating?: number) => {
    const ratingToUse = typeof nextRating === "number" ? nextRating : selectedRating
    if (ratingToUse !== null) {
      const updatedAnswers = { ...answers, [questions[currentQuestion].id]: ratingToUse }
      setAnswers(updatedAnswers)

      if (currentQuestion < questions.length - 1) {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
        setSelectedRating(updatedAnswers[questions[nextQuestion].id] ?? null)
      } else {
        // Test completed - save to Google Sheets first, then show loading
        setTestCompleted(true) // Disable button immediately
        
        // Save to Google Sheets using service (only if gender is set)
        if (gender) {
          try {
            const saveResult = await googleSheetsService.saveTestResults({
              name,
              gender,
              answers: updatedAnswers,
              code: urlCode || undefined
            })

            if (saveResult.success) {
              console.log('Test results saved successfully')

              handleSendEmailResults(updatedAnswers)

              const personalityType = calculatePersonalityType(updatedAnswers)
              const styleKey = personalityType.toLowerCase()
              const styleIndex = gender ? getStyleIndexForGender(styleKey, gender) : 0
              const styleData = gender ? getStyleDataForSelection(styleKey, gender) : null

              if (styleData && typeof window !== "undefined") {
                try {
                  window.sessionStorage.setItem(
                    "testResultStyleData",
                    JSON.stringify({
                      styleKey,
                      gender,
                      styleIndex,
                      styleData,
                    }),
                  )
                } catch (storageError) {
                  console.error("Unable to store test result style data:", storageError)
                }
              }

              setIsLoading(true)
              await new Promise((resolve) => setTimeout(resolve, 5000))
              router.push(`/result?style=${styleKey}&gender=${gender}&styleIndex=${styleIndex}`)
              return
            } else {
              console.error('Failed to save test results:', saveResult.message)
            }
          } catch (error) {
            console.error('Error saving test results:', error)
          }
        } else {
          console.error('Gender not set, cannot save test results')
        }
      }
    }
  }

  const handleSendEmailResults = async (testAnswers: Record<number, number>) => {
    try {
      // Find email by code
      const emailResult = await googleSheetsService.findEmailByCode(urlCode!)

      if (emailResult.success && emailResult.data) {
        const { email, codeFound } = emailResult.data

        if (!codeFound) {
          console.log('Code not found, using default email:', email)
        }

        // Send test results via email
        const emailSendResult = await emailService.sendTestResultsEmail({
          email,
          name,
          gender: gender!,
          answers: testAnswers,
          code: urlCode!
        })

        if (emailSendResult.success) {
          console.log('Email sent successfully')
        } else {
          console.error('Failed to send email:', emailSendResult.message)
        }

      } else {
        console.error('Could not find email for code:', urlCode, emailResult.message)
      }
    } catch (error) {
      console.error('Error sending email results:', error)
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
          <div ref={questionRef} className="mb-16 max-w-8xl text-center">
            <h2 className="text-3xl leading-relaxed tracking-wide text-[#5a6b6a] lg:text-4xl">
              {question.text}
              <br />
              <em>{question.italicText}</em>
            </h2>
          </div>

          <div className="mb-16 grid w-full max-w-8xl grid-cols-[auto_1fr_auto] items-center gap-3 sm:items-center sm:gap-5">
            <Button
              onClick={handleBack}
              disabled={testCompleted}
              variant="ghost"
              className="mt-12 flex h-12 w-12 items-center justify-center rounded-full text-[#5a6b6a] transition-transform duration-200 hover:bg-[#f0e9e2] hover:text-[#BD9479] active:scale-90 disabled:opacity-30 sm:mt-0 sm:h-20 sm:w-20"
            >
              <svg
                className="h-6 w-6 sm:h-10 sm:w-10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.78033 0.21967C5.48744 -0.0732233 5.01256 -0.0732233 4.71967 0.21967L0.71967 4.21967C0.426777 4.51256 0.426777 4.98744 0.71967 5.28033L4.71967 9.28033C5.01256 9.57322 5.48744 9.57322 5.78033 9.28033C6.07322 8.98744 6.07322 8.51256 5.78033 8.21967L2.31066 4.75L5.78033 1.28033C6.07322 0.987437 6.07322 0.512563 5.78033 0.21967Z"
                  fill="currentColor"
                />
              </svg>
            </Button>

            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (testCompleted || isLoading) return
                  setSelectedRating(option.value)
                  void handleContinue(option.value)
                  scrollToQuestion()
                }}
                disabled={testCompleted || isLoading}
                className={`flex w-full max-w-[260px] flex-col items-center gap-2 rounded-2xl px-3 py-3 text-center text-sm transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[200px] sm:px-8 sm:py-6 sm:text-base ${option.bgColor
                  } ${selectedRating === option.value ? "ring-4 ring-[#e9b999]" : ""}`}
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: option.stars }).map((_, i) => (
                    <Star key={i} filled />
                  ))}
                </div>
                <span className="whitespace-nowrap rounded-full bg-white px-4 py-1 text-xs font-medium text-[#5a6b6a] sm:px-6 sm:py-2 sm:text-sm">
                  {option.label}
                </span>
              </button>
            ))}
            </div>

            <Button
              onClick={async () => {
                scrollToQuestion()
                await handleContinue()
              }}
              disabled={selectedRating === null || testCompleted}
              variant="ghost"
              className="mt-12 flex h-12 w-12 items-center justify-center rounded-full text-[#5a6b6a] transition-transform duration-200 hover:bg-[#f0e9e2] hover:text-[#BD9479] active:scale-90 disabled:opacity-30 sm:mt-0 sm:h-20 sm:w-20"
            >
              <svg
                className="h-6 w-6 sm:h-10 sm:w-10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.21967 0.21967C0.512563 -0.0732233 0.987437 -0.0732233 1.28033 0.21967L5.28033 4.21967C5.57322 4.51256 5.57322 4.98744 5.28033 5.28033L1.28033 9.28033C0.987437 9.57322 0.512563 9.57322 0.21967 9.28033C-0.0732233 8.98744 -0.0732233 8.51256 0.21967 8.21967L3.68934 4.75L0.21967 1.28033C-0.0732233 0.987437 -0.0732233 0.512563 0.21967 0.21967Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>

          <div className="flex w-full max-w-8xl justify-between sm:hidden" />
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
