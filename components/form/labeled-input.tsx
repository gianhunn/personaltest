import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { roundedInputClass, roundedInputErrorClass } from "@/lib/form-styles"
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
        <Input
          id={id}
          className={cn(
            error ? roundedInputErrorClass : roundedInputClass,
            className
          )}
          {...inputProps}
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
