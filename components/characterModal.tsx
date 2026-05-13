import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Character, CharacterStatus } from "@/types/characterType";

export type CharacterModalProps = {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function statusBadgeVariant(
  status: CharacterStatus,
): "accent" | "destructive" | "muted" {
  if (status === "Alive") return "accent"
  if (status === "Dead") return "destructive"
  return "muted"
}

export function CharacterModal({
  character,
  open,
  onOpenChange,
}: CharacterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-md">
        {character ? (
          <div className="flex max-h-[min(88vh,640px)] flex-col gap-5 overflow-y-auto p-4 pb-6 pt-4 pr-12 sm:p-6 sm:pr-14">
            <div className="relative mx-auto aspect-square w-full max-w-[240px] shrink-0 overflow-hidden rounded-2xl border border-line bg-muted/20 shadow-md ring-1 ring-foreground/5 sm:max-w-[280px]">
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(max-width: 640px) 240px, 280px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 space-y-4 text-center sm:text-left">
              <DialogHeader className="gap-3 space-y-0">
                <DialogTitle className="text-xl leading-tight tracking-tight sm:text-2xl">
                  {character.name}
                </DialogTitle>
                <DialogDescription asChild>
                  <div
                    className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
                    aria-label="Resumen del personaje"
                  >
                    <Badge variant="outline">{character.species}</Badge>
                    {character.type ? (
                      <Badge variant="secondary">{character.type}</Badge>
                    ) : null}
                    <Badge variant={statusBadgeVariant(character.status)}>
                      {character.status}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div>
                <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-ink-dim">
                  Información
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="outline" className="tabular-nums">
                    Género · {character.gender}
                  </Badge>
                  <Badge variant="outline" className="tabular-nums">
                    {character.episode.length}{" "}
                    {character.episode.length === 1 ? "episodio" : "episodios"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-dim">
                  Origen y ubicación
                </p>
                <div className="flex flex-col gap-2">
                  <Badge
                    variant="secondary"
                    className="w-full justify-center py-2 sm:justify-start"
                  >
                    <span className="shrink-0 text-ink-faint">Origen · </span>
                    <span>{character.origin.name}</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="w-full justify-center py-2 sm:justify-start"
                  >
                    <span className="shrink-0 text-ink-faint">Ubicación · </span>
                    <span>{character.location.name}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
