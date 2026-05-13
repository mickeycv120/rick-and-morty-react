import type { Character } from "@/types/characterType";

const API_URL = "https://rickandmortyapi.com/api";

export interface PaginatedResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: T[];
}

export async function getCharacters(page = 1): Promise<PaginatedResponse<Character>> {
    const response = await fetch(`${API_URL}/character?page=${page}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status}`);
    }

    const data: PaginatedResponse<Character> = await response.json();
    return data;
}