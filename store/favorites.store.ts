import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CharacterCardData } from "@/types/characterType";

type FavoritesState = {
  favorites: CharacterCardData[];
};

type FavoritesActions = {
  toggle: (character: CharacterCardData) => void;
  isFavorite: (id: number) => boolean;
};

type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggle: (character) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.id === character.id);
          return {
            favorites: exists
              ? state.favorites.filter((f) => f.id !== character.id)
              : [...state.favorites, character],
          };
        }),

      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    {
      name: "rm-favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);