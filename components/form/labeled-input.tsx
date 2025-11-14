import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import {
  formErrorTextClass,
  formFieldContainerClass,
  formLabelClass,
  roundedInputClass,
  roundedInputErrorClass,
} from "@/lib/form-styles"
import { cn } from "@/lib/utils"

type LabeledInputProps = ComponentPropsWithoutRef<typeof Input> & {
  label: ReactNode
  containerClassName?: string
  labelClassName?: string
  error?: string
}

export function LabeledInput({
  label,
  containerClassName,
  labelClassName,
  className,
  id,
  error,
  ...inputProps
}: LabeledInputProps) {
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
        <Input
          id={id}
          className={cn(
            error ? roundedInputErrorClass : roundedInputClass,
            className
          )}
          {...inputProps}
        />
        {error && <p className={formErrorTextClass}>{error}</p>}
      </div>
    </div>
  )
}
