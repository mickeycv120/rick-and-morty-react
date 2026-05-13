"use client";
import Link from "next/link";
import { Heart, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header
      className="relative z-50 w-full shrink-0 border-b border-line bg-surface px-4 py-3 text-ink"
      data-testid="site-navbar"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-1.5 font-semibold tracking-tight text-ink transition-colors hover:text-acid"
        >
          <span className="text-base sm:text-lg">Rick & Morty</span>
        </Link>

        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <Input
            type="search"
            name="q"
            placeholder="Buscar personajes…"
            className="h-9 border-line-2 bg-bg-2/80 pl-9 text-sm text-ink placeholder:text-ink-faint focus-visible:border-acid-deep"
            aria-label="Buscar personajes"
                  />
              </div>
                    <Button variant="outline" onClick={() => {}}>
                      <Heart className="size-4" />
            </Button>
      </div>
    </header>
  );
}
