import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Heart } from 'lucide-react'
import { CharacterCardData } from '@/types/characterType'
import Image from 'next/image'
import { Button } from './ui/button'

export type CharacterCardProps = {
    character: CharacterCardData;
    onFavorite: () => void;
    isFavorite: boolean;
}

export const CharacterCard = ({ character, onFavorite, isFavorite }: CharacterCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={character.image} alt={character.name} width={100} height={100} />
              <CardDescription>Character Description</CardDescription>
              <Button variant="outline" onClick={onFavorite}>
                <Heart className={isFavorite ? 'text-red-500' : 'text-gray-500'} />
              </Button>
      </CardContent>
    </Card>
  );
};
