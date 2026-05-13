import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const DEFAULT_PLACEHOLDER_COUNT = 8

export function CharacterCardSkeleton() {
  return (
    <Card className="w-full max-w-sm gap-0 overflow-hidden p-0" aria-hidden>
      <div className="relative">
        <Skeleton className="aspect-square w-full rounded-none border-b border-line" />
        <Skeleton className="absolute top-2 right-2 z-1 size-8 rounded-full" />
      </div>
      <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 text-left">
            <Skeleton className="h-6 w-[78%]" />
            <Skeleton className="h-4 w-[45%]" />
          </div>
          <Skeleton className="my-2 h-px w-full opacity-60" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function CharacterGridSkeleton({
  count = DEFAULT_PLACEHOLDER_COUNT,
}: {
  count?: number
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </>
  )
}
