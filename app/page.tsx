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
        className="mx-auto flex max-w-[1440px] items-end justify-between gap-8 px-8 pt-12 pb-6"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="m-0 text-[52px] leading-none font-bold tracking-[-0.03em] text-foreground"
        >
          Explora el{" "}
          <em className="not-italic bg-[linear-gradient(110deg,var(--acid)_30%,var(--violet)_90%)] bg-clip-text text-transparent">
            multiverso
          </em>{" "}
          infinito de personajes
        </h1>
        <p className="m-3.5 text-[var(--ink-dim)] text-md ">
          Encuentra a tus personajes favoritos y descubre más sobre su historia en el universo de Rick and Morty.
        </p>
      </section>

      <section aria-labelledby="characters-heading">
        <h2 id="characters-heading" className="sr-only">
          Personajes
        </h2>
        <div className="flex gap-4 px-8">
          <div>
            <div>{data?.info.count ?? "-"}</div>
            <div>Personajes</div>
          </div>

          <div>
            <div>{data?.info.pages ?? "-"}</div>
            <div>Páginas</div>
          </div>
        </div>

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