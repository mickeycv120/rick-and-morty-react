"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/characters.service";

export function useCharacters(page = 1) {
    return useQuery({
        queryKey: ["characters", "list", page],
        queryFn: () => getCharacters(page),
    });
}
