"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/store/favorites.store";

const DEBOUNCE_MS = 350;

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nameFromUrl = searchParams.get("name")?.trim() ?? "";
  const showingFavorites = searchParams.get("favorites") === "1";

  const [inputValue, setInputValue] = useState(nameFromUrl);
  const lastCommittedRef = useRef(nameFromUrl);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  useEffect(() => {
    if (nameFromUrl !== lastCommittedRef.current) {
      setInputValue(nameFromUrl);
      lastCommittedRef.current = nameFromUrl;
    }
  }, [nameFromUrl]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const commitToUrl = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) params.set("name", trimmed);
      else params.delete("name");
      params.delete("page");
      const qs = params.toString();
      if (qs === searchParams.toString()) return;
      lastCommittedRef.current = trimmed;
      router.replace(qs ? `/?${qs}` : "/", { scroll: false });
    },
    [router, searchParams],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        commitToUrl(value);
      }, DEBOUNCE_MS);
    },
    [commitToUrl],
  );

  const toggleFavorites = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (showingFavorites) params.delete("favorites");
    else params.set("favorites", "1");
    params.delete("page");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
  }, [router, searchParams, showingFavorites]);

  return (
    <header
      className="relative z-50 w-full shrink-0 border-b border-line bg-surface px-4 py-3 text-ink"
      data-testid="site-navbar"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src="/Rick_and_Morty.svg"
            alt="Rick and Morty"
            width={264}
            height={81}
            priority
            className="h-7 w-auto max-w-[min(200px,52vw)] object-contain object-left sm:h-9 sm:max-w-[240px]"
          />
        </Link>

        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <Input
            type="search"
            name="q"
            value={inputValue}
            onChange={handleChange}
            placeholder="Buscar personajes…"
            className="h-9 border-line-2 bg-bg-2/80 pl-9 text-sm text-ink placeholder:text-ink-faint focus-visible:border-acid-deep"
            aria-label="Buscar personajes"
          />
        </div>

        <Button
          variant={showingFavorites ? "default" : "outline"}
          aria-label="Filtrar favoritos"
          aria-pressed={showingFavorites}
          className="relative shrink-0"
          onClick={toggleFavorites}
        >
          <Heart
            className={showingFavorites ? "size-4 fill-current" : "size-4"}
          />
          {favoritesCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-acid text-[10px] font-bold text-black">
              {favoritesCount > 99 ? "99+" : favoritesCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}