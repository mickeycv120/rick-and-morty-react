import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex max-w-full items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium leading-snug wrap-break-word whitespace-normal transition-colors [&>svg]:size-3.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-muted text-muted-foreground",
        outline: "border-line bg-surface-2/90 text-foreground shadow-sm",
        accent:
          "border-acid/30 bg-acid/12 text-acid-deep",
        destructive:
          "border-red/35 bg-red/12 text-red",
        muted:
          "border-line-2 bg-bg-2 text-ink-dim",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
