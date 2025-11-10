import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { roundedInputClass } from "@/lib/form-styles"
import { cn } from "@/lib/utils"

type LabeledInputProps = ComponentPropsWithoutRef<typeof Input> & {
  label: ReactNode
  containerClassName?: string
  labelClassName?: string
}

export function LabeledInput({
  label,
  containerClassName,
  labelClassName,
  className,
  id,
  ...inputProps
}: LabeledInputProps) {
  return (
    <div className={cn("space-y-4", containerClassName)}>
      <label
        htmlFor={id}
        className={cn(
          "flex justify-center text-center font-serif text-4xl tracking-wide text-[#5B4F47] lg:text-5xl",
          labelClassName,
        )}
      >
        {label}
      </label>
      <Input id={id} className={cn(roundedInputClass, className)} {...inputProps} />
    </div>
  )
}

