import Image from "next/image";
import { Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CharacterCardData } from "@/types/characterType";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

export type CharacterCardProps = {
  character: CharacterCardData;
  onFavorite: () => void;
  onSelect?: () => void;
  isFavorite: boolean;
  priority?: boolean;
};

export const CharacterCard = ({
  character,
  onFavorite,
  onSelect,
  isFavorite,
  priority = false,
}: CharacterCardProps) => {
  return (
    <Card className="relative w-full max-w-sm gap-0 p-0 overflow-hidden">
      {onSelect ? (
        <button
          type="button"
          className="absolute inset-0 z-1 cursor-pointer rounded-xl border-0 bg-transparent p-0 text-left outline-none transition-colors hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Ver detalles de ${character.name}`}
          onClick={() => onSelect()}
        />
      ) : null}
      <div className="relative z-2 pointer-events-none">
        <div>
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            priority={priority}
            className="pointer-events-none aspect-square w-full border-b border-line object-cover"
          />
        </div>
        <Toggle
          variant="outline"
          size="icon"
          pressed={isFavorite}
          onPressedChange={() => onFavorite()}
          className="pointer-events-auto absolute top-2 right-2 z-3 bg-background/80 rounded-full"
        >
          <Heart
            className={
              isFavorite
                ? "size-4 text-red"
                : "size-4 text-ink-faint transition-colors group-hover/toggle:text-red"
            }
          />
        </Toggle>
      </div>
      <CardContent className="relative z-2 pointer-events-none flex flex-col gap-3 px-4 pb-4 pt-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-left">
            <h3 className="text-lg leading-snug font-bold text-foreground">
              {character.name}
            </h3>
            <p className="m-0 text-sm text-ink-dim">{character.species}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>Estado: {character.status}</span>
            <span className="text-ink-dim">
              <span>Origen: </span>({character.origin.name})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
