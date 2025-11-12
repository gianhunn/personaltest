import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { roundedTextareaClass, roundedTextareaErrorClass } from "@/lib/form-styles"
import { cn } from "@/lib/utils"

type LabeledTextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: ReactNode
  containerClassName?: string
  labelClassName?: string
  error?: string
}

export function LabeledTextarea({
  label,
  containerClassName,
  labelClassName,
  className,
  id,
  error,
  ...textareaProps
}: LabeledTextareaProps) {
  return (
    <div className={cn("space-y-4", containerClassName)}>
      <label
        htmlFor={id}
        className={cn(
          "font-serif text-4xl tracking-wide text-[#5B4F47] lg:text-3xl",
          labelClassName,
        )}
      >
        {label}
      </label>
      <div className="space-y-2">
        <textarea
          id={id}
          className={cn(
            error ? roundedTextareaErrorClass : roundedTextareaClass,
            className
          )}
          {...textareaProps}
        />
        {error && (
          <p className="text-center text-sm text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}