"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/characters.service";

type UseCharactersOptions = {
    enabled?: boolean;
};

export function useCharacters(
    page = 1,
    name = "",
    options?: UseCharactersOptions,
) {
    return useQuery({
        queryKey: ["characters", "list", page, name],
        queryFn: () => getCharacters(page, name),
        enabled: options?.enabled ?? true,
    });
}
