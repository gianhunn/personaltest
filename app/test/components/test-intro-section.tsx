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
  return (
    <SplitImageContent
      as="main"
      imageSrc="/images/test/stylish-woman.jpg"
      alt="Stylish fashion photo"
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
          <h2 className="flex justify-center font-serif text-4xl tracking-wide text-[#5B4F47] lg:text-5xl">
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
          <Button onClick={onStart} disabled={!name || !gender} className={primaryRoundedButtonClass}>
            Bắt đầu
          </Button>
        </div>
      </div>
    </SplitImageContent>
  )
}
