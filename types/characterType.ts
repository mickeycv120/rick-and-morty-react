export type CharacterStatus = "Alive" | "Dead" | "Unknown";
export type CharacterGender = "Male" | "Female" | "Genderless" | "Unknown";

export interface CharacterLocation {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    origin: CharacterLocation;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export type CharacterCardData = Pick<Character, "id" | "name" | "image"| "status" | "species" | "origin">;
