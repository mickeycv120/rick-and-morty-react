"use client";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/characterCard";
export default function Home() {
   const { data, isLoading, error } = useCharacters();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
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
              <div className="font-heading text-2xl font-semibold tabular-nums text-foreground">
                {data?.info.count ?? "-"}
              </div>
              <div className="text-sm text-ink-dim">Personajes</div>
            </div>
            <div>
              <div className="font-heading text-2xl font-semibold tabular-nums text-foreground">
                {data?.info.pages ?? "-"}
              </div>
              <div className="text-sm text-ink-dim">Páginas</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="characters-heading">
        <h2 id="characters-heading" className="sr-only">
          Personajes
        </h2>

        {/* 
      <div>
        <div>{favoritesCount ?? '-'}</div>
        <div>Favoritos</div>
      </div> */}

        <div className="mx-4 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.results?.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              onFavorite={() => {}}
              isFavorite={false}
              priority={index < 4}
            />
          ))}
        </div>
      </section>
    </div>
  );
}