import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export interface PaginationContainerProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** Páginas a mostrar: números y elipsis cuando hay muchas páginas. */
function getVisiblePages(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total < 1) return []
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const delta = 1
  const pages = new Set<number>()
  pages.add(1)
  pages.add(total)
  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= 1 && i <= total) pages.add(i)
  }

  const sorted = [...pages].sort((a, b) => a - b)
  const out: (number | "ellipsis")[] = []
  let prev = 0
  for (const p of sorted) {
    if (prev && p - prev > 1) {
      out.push("ellipsis")
    }
    out.push(p)
    prev = p
  }
  return out
}

export function PaginationContainer({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationContainerProps) {
  if (totalPages <= 1) {
    return null
  }

  const visible = getVisiblePages(currentPage, totalPages)
  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  const go = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Anterior"
            aria-disabled={!canGoBack}
            className={cn(!canGoBack && "pointer-events-none opacity-40")}
            onClick={(e) => {
              e.preventDefault()
              if (canGoBack) go(currentPage - 1)
            }}
          />
        </PaginationItem>

        {visible.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                size="default"
                isActive={item === currentPage}
                aria-label={`Ir a la página ${item}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            text="Siguiente"
            aria-disabled={!canGoForward}
            className={cn(!canGoForward && "pointer-events-none opacity-40")}
            onClick={(e) => {
              e.preventDefault()
              if (canGoForward) go(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
