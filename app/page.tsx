"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CharacterCard } from "@/components/characterCard";
import { CharacterGridSkeleton } from "@/components/characterCardSkeleton";
import { CharacterModal } from "@/components/characterModal";
import { PaginationContainer } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useCharacters } from "@/hooks/useCharacters";
import type { Character } from "@/types/characterType";

function parsePageParam(params: URLSearchParams) {
  const raw = params.get("page");
  const n = Math.floor(Number(raw));
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parsePageParam(searchParams);
  const name = searchParams.get("name")?.trim() ?? "";

  const { data, isPending, error } = useCharacters(page, name);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const totalPages = data?.info.pages ?? 0;

  const handlePageChange = (next: number) => {
    setSelectedCharacter(null);
    const p = new URLSearchParams(searchParams.toString());
    if (next <= 1) p.delete("page");
    else p.set("page", String(next));
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div>
      <section
        className="mx-auto flex max-w-[1440px] flex-col gap-4 px-8 pt-12 pb-6"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="m-0 text-[52px] leading-none font-bold tracking-[-0.03em] text-foreground"
        >
          Explora el{" "}
          <em className="not-italic bg-[linear-gradient(110deg,var(--acid)_30%,var(--violet)_90%)] bg-clip-text text-transparent">
            multiverso <br />
          </em>{" "}
          infinito de personajes
        </h1>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="m-0 max-w-2xl text-ink-dim text-md">
            Encuentra a tus personajes favoritos y descubre más sobre su historia en el universo de Rick and Morty.
          </p>
          <div className="flex shrink-0 gap-8 sm:justify-end sm:gap-10">
            <div>
              {isPending ? (
                <Skeleton className="mb-1 h-8 w-16" />
              ) : (
                <div className="font-heading text-2xl font-semibold tabular-nums text-foreground">
                  {error ? "—" : (data?.info.count ?? "—")}
                </div>
              )}
              <div className="text-sm text-ink-dim">Personajes</div>
            </div>
            <div>
              {isPending ? (
                <Skeleton className="mb-1 h-8 w-12" />
              ) : (
                <div className="font-heading text-2xl font-semibold tabular-nums text-foreground">
                  {error ? "—" : (data?.info.pages ?? "—")}
                </div>
              )}
              <div className="text-sm text-ink-dim">Páginas</div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="characters-heading"
        aria-busy={isPending}
      >
        <h2 id="characters-heading" className="sr-only">
          Personajes
        </h2>

        <div className="mx-4 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {error ? (
            <p
              className="col-span-full rounded-lg border border-line bg-muted/30 px-4 py-6 text-center text-sm text-foreground"
              role="alert"
            >
              No se pudieron cargar los personajes: {error.message}
            </p>
          ) : isPending ? (
            <CharacterGridSkeleton />
          ) : !data?.results?.length ? (
            <p className="col-span-full px-4 py-10 text-center text-ink-dim">
              No hay personajes para mostrar.
            </p>
          ) : (
            data.results.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                onFavorite={() => {}}
                onSelect={() => setSelectedCharacter(character)}
                isFavorite={false}
                priority={index < 4}
              />
            ))
          )}
        </div>

        {!error && !isPending && totalPages > 0 ? (
          <div className="mx-4 mb-10 flex justify-center px-4">
            <PaginationContainer
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </section>

      <CharacterModal
        character={selectedCharacter}
        open={selectedCharacter !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCharacter(null);
        }}
      />
    </div>
  );
}

function HomeFallback() {
  return (
    <div>
      <section className="mx-auto flex max-w-[1440px] flex-col gap-4 px-8 pt-12 pb-6">
        <Skeleton className="h-14 w-full max-w-xl" />
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <Skeleton className="h-20 w-full max-w-2xl" />
          <div className="flex gap-8">
            <Skeleton className="h-16 w-24" />
            <Skeleton className="h-16 w-24" />
          </div>
        </div>
      </section>
      <div className="mx-4 my-8">
        <CharacterGridSkeleton />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeContent />
    </Suspense>
  );
}
