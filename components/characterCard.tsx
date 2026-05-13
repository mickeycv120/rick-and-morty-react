import Image from "next/image";
import { Heart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Image
          src={character.image}
          alt={character.name}
          width={100}
          height={100}
          className="rounded-lg border border-line"
        />
        <CardDescription>Character Description</CardDescription>
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
