import { Button } from "@/components/ui/button"
import { SplitImageContent } from "@/components/layout/split-image-content"
import { LabeledInput } from "@/components/form/labeled-input"
import { primaryRoundedButtonClass } from "@/lib/form-styles"

export function ContactFormSection() {
  return (
    <section className="relative w-full bg-[#f5f1ea]">
      <SplitImageContent imageSrc="/images/contact-us/design-space.jpg" alt="Design space">
        <form className="w-full max-w-2xl space-y-12">
          <LabeledInput
            id="contact-phone"
            type="tel"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại của bạn"
          />
          <LabeledInput
            id="contact-datetime"
            type="datetime-local"
            label="Bạn muốn hẹn lịch vào"
          />
          <div className="pt-4 flex justify-center">
            <Button type="submit" className={primaryRoundedButtonClass}>
              Gửi
            </Button>
          </div>
        </form>
      </SplitImageContent>
    </section>
  )
}
