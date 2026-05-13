import Image from "next/image";
import { Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { CharacterCardData } from "@/types/characterType";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

export type CharacterCardProps = {
  character: CharacterCardData;
  onFavorite: () => void;
  isFavorite: boolean;
  priority?: boolean;
};

export const CharacterCard = ({
  character,
  onFavorite,
  isFavorite,
  priority = false,
}: CharacterCardProps) => {
  return (
    <Card className="w-full max-w-sm gap-0 p-0">
      <div className="relative">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          priority={priority}
          className="aspect-square w-full border-b border-line object-cover"
        />
        <Toggle
          variant="outline"
          size="icon"
          pressed={isFavorite}
          onPressedChange={() => onFavorite()}
          className="absolute top-2 right-2"
        >
          <Heart
            className={
              isFavorite ? "size-4 text-red" : "size-4 text-ink-faint"
            }
          />
        </Toggle>
      </div>
      <CardContent className="flex flex-col gap-3 px-4 pb-4 pt-3">
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
