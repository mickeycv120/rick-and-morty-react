import Image from "next/image";
import { Heart } from "lucide-react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CharacterCardData } from "@/types/characterType";

export type CharacterCardProps = {
  character: CharacterCardData;
  onFavorite: () => void;
  isFavorite: boolean;
};

export const CharacterCard = ({
  character,
  onFavorite,
  isFavorite,
}: CharacterCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-3">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="aspect-square w-full rounded-lg border border-line object-cover"
        />
        <CardDescription>{character.name}</CardDescription>
        <Button variant="outline" onClick={onFavorite}>
          <Heart
            className={
              isFavorite ? "text-red" : "text-ink-faint"
            }
          />
        </Button>
      </CardContent>
    </Card>
  );
};
