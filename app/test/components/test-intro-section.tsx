import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { LabeledInput } from "@/components/form/labeled-input"
import { SplitImageContent } from "@/components/layout/split-image-content"
import { cn } from "@/lib/utils"
import {
  genderOptionButtonBaseClass,
  genderOptionButtonSelectedClass,
  genderOptionButtonUnselectedClass,
  primaryRoundedButtonClass,
} from "@/lib/form-styles"

type GenderValue = "male" | "female" | null

type TestIntroSectionProps = {
  name: string
  gender: GenderValue
  onNameChange: (value: string) => void
  onGenderChange: (gender: GenderValue) => void
  onStart: () => void
}

export function TestIntroSection({
  name,
  gender,
  onNameChange,
  onGenderChange,
  onStart,
}: TestIntroSectionProps) {
  const [isStarting, setIsStarting] = useState(false)
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  const handleStartClick = useCallback(() => {
    if (!name || !gender || isStarting) {
      return
    }

    setIsStarting(true)
    animationTimeoutRef.current = setTimeout(() => {
      onStart()
    }, 450)
  }, [gender, isStarting, name, onStart])

  return (
    <SplitImageContent
      as="main"
      imageSrc="/images/test/stylish-woman.jpg"
      alt="Stylish fashion photo"
      className={cn(
        "transition-all duration-500 ease-out",
        isStarting ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0",
      )}
    >
      <div className="w-full max-w-2xl space-y-12">
        <LabeledInput
          id="test-name"
          type="text"
          label="Tên của bạn là"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nhập tên của bạn"
        />

        <div className="space-y-4">
          <h2 className="font-serif text-4xl tracking-wide text-[#5B4F47] lg:text-3xl">
            Giới tính
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Button
              onClick={() => onGenderChange("male")}
              className={cn(
                genderOptionButtonBaseClass,
                gender === "male"
                  ? genderOptionButtonSelectedClass
                  : genderOptionButtonUnselectedClass,
              )}
            >
              Nam
            </Button>
            <Button
              onClick={() => onGenderChange("female")}
              className={cn(
                genderOptionButtonBaseClass,
                gender === "female"
                  ? genderOptionButtonSelectedClass
                  : genderOptionButtonUnselectedClass,
              )}
            >
              Nữ
            </Button>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            onClick={handleStartClick}
            disabled={!name || !gender || isStarting}
            className={primaryRoundedButtonClass}
          >
            Bắt đầu
          </Button>
        </div>
      </div>
    </SplitImageContent>
  )
}
