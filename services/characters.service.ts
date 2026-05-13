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

export async function getCharacters(page = 1, name = ""): Promise<PaginatedResponse<Character>> {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (name.trim()) {
        params.set("name", name);
    }

    const response = await fetch(`${API_URL}/character?${params.toString()}`);

    if (response.status === 404) {
        return {
            info: {
                count: 0,
                pages: 0,
                next: null,
                prev: null,
            },
            results: [],
        };
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch characters: ${response.status}`);
    }

    return response.json();
}