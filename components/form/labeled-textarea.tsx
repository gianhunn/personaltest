import type { ComponentPropsWithoutRef, ReactNode } from "react"

import {
  formErrorTextClass,
  formFieldContainerClass,
  formLabelClass,
  roundedTextareaClass,
  roundedTextareaErrorClass,
} from "@/lib/form-styles"
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
    <div className={cn(formFieldContainerClass, containerClassName)}>
      <label
        htmlFor={id}
        className={cn(
          formLabelClass,
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
        {error && <p className={formErrorTextClass}>{error}</p>}
      </div>
    </div>
  )
}