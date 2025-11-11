"use client"

import { Button } from "@/components/ui/button"
import { SplitImageContent } from "@/components/layout/split-image-content"
import { LabeledInput } from "@/components/form/labeled-input"
import { primaryRoundedButtonClass } from "@/lib/form-styles"
import React, { useState, useEffect } from "react"
import { contactService, emailService, googleSheetsService } from "@/services"

interface FormErrors {
  phone?: string
  datetime?: string
}

export function ContactFormSection() {
  const [phone, setPhone] = useState("")
  const [datetime, setDatetime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [urlCode, setUrlCode] = useState<string | null>(null)

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

  // Validation functions
  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) {
      return "Vui lòng nhập số điện thoại"
    }

    // Remove all spaces and special characters for validation
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')

    // Check if it's a valid Vietnamese phone number
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/

    if (!phoneRegex.test(cleanPhone)) {
      return "Số điện thoại không hợp lệ (VD: 0987654321)"
    }

    return undefined
  }

  const validateDatetime = (datetime: string): string | undefined => {
    if (!datetime) {
      return "Vui lòng chọn thời gian hẹn lịch"
    }

    const selectedDate = new Date(datetime)
    const now = new Date()

    if (selectedDate <= now) {
      return "Thời gian hẹn phải là trong tương lai"
    }

    // Check if the date is not too far in the future (max 1 year)
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    if (selectedDate > oneYearFromNow) {
      return "Thời gian hẹn không được quá 1 năm"
    }

    return undefined
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)

    // Clear error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }))
    }

    // Clear submit message when user starts editing
    if (submitMessage) {
      setSubmitMessage("")
    }
  }

  const handleDatetimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDatetime(value)

    // Clear error when user selects datetime
    if (errors.datetime) {
      setErrors(prev => ({ ...prev, datetime: undefined }))
    }

    // Clear submit message when user starts editing
    if (submitMessage) {
      setSubmitMessage("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitMessage("")
    e.preventDefault()

    // Validate form and show errors
    const phoneError = validatePhone(phone)
    const datetimeError = validateDatetime(datetime)

    setErrors({
      phone: phoneError,
      datetime: datetimeError
    })

    // If there are errors, don't submit
    if (phoneError || datetimeError) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const result = await contactService.submitContactForm({
        phone: phone.trim(),
        datetime,
        code: urlCode || undefined
      })

      if (result.success) {
        setSubmitMessage("Đã gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
        setPhone("")
        setDatetime("")
        setErrors({})
        handleSendContactFormEmail()
      } else {
        setSubmitMessage("Có lỗi xảy ra. Vui lòng thử lại.")
        console.error("Failed to submit contact form:", result.message)
      }
    } catch (error) {
      setSubmitMessage("Có lỗi xảy ra. Vui lòng thử lại.")
      console.error("Error submitting contact form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendContactFormEmail = async () => {
    try {
      // Find email by code
      const emailResult = await googleSheetsService.findEmailByCode(urlCode!)

      if (emailResult.success && emailResult.data) {
        const { email, codeFound } = emailResult.data

        if (!codeFound) {
          console.log('Code not found, using default email:', email)
        }

        // Send contact form via email
        const emailSendResult = await emailService.sendContactFormEmail({
          email,
          phone: phone.trim(),
          datetime,
          code: urlCode || undefined,
          codeFound
        })

        if (emailSendResult.success) {
          console.log('Contact email sent successfully')
        } else {
          console.error('Failed to send contact email:', emailSendResult.message)
        }

      } else {
        console.error('Could not find email for code:', urlCode, emailResult.message)
      }
    } catch (error) {
      console.error('Error sending contact email:', error)
    }
  }

  return (
    <section className="relative w-full bg-[#f5f1ea]">
      <SplitImageContent imageSrc="/images/contact-us/design-space.jpg" alt="Design space">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-2xl space-y-12">
          <LabeledInput
            id="contact-phone"
            type="tel"
            label="Số điện thoại"
            placeholder="Ví dụ: 0987654321"
            value={phone}
            onChange={handlePhoneChange}
            error={errors.phone}
            required
          />
          <LabeledInput
            id="contact-datetime"
            type="datetime-local"
            label="Bạn muốn hẹn lịch vào"
            value={datetime}
            onChange={handleDatetimeChange}
            error={errors.datetime}
            required
          />
          {submitMessage && (
            <div className={`text-center text-lg font-medium px-4 py-3 rounded-lg ${
              submitMessage.includes("thành công")
                ? "text-green-700 bg-green-50 border border-green-200"
                : submitMessage.includes("kiểm tra")
                ? "text-orange-700 bg-orange-50 border border-orange-200"
                : "text-red-700 bg-red-50 border border-red-200"
            }`}>
              {submitMessage}
            </div>
          )}
          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={primaryRoundedButtonClass}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi"}
            </Button>
          </div>
        </form>
      </SplitImageContent>
    </section>
  )
}
