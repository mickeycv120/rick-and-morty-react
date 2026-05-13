"use client";
import { useEffect, useState } from "react"
import { getCharacters } from "@/services/characters.service"
import type { Character } from "@/types/characterType"

export const useCharacters = (page = 1) => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
  return {}
}
