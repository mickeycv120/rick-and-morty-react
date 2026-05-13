import type { Character } from "@/types/characterType";

const API_URL = "https://rickandmortyapi.com/api";

interface CharacterResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

export async function getCharacters(page = 1): Promise<Character[]> {
    const response = await fetch(`${API_URL}/character?page=${page}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status}`);
    }

    const data: CharacterResponse = await response.json();
    return data.results;
}