# Rick and Morty — explorador de personajes

Aplicación web para consultar personajes de la [Rick and Morty API](https://rickandmortyapi.com/): listado paginado, búsqueda por nombre, vista de detalle y favoritos persistidos en el cliente. Front construido con Next.js (App Router), React 19 y TypeScript; estilos con Tailwind CSS v4 y componentes base alineados con shadcn/ui.

---

## Requisitos

- Node.js 20+ (recomendado alinear con el ecosistema Next.js actual)
- npm (gestor usado en los scripts del repo)

---

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:3000`.

| Script        | Descripción                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Servidor de desarrollo (Next.js)     |
| `npm run build` | Compilación de producción          |
| `npm run start` | Servidor tras `build`              |
| `npm run lint`  | ESLint (config Next.js)            |

---

## Funcionalidades implementadas

- **Listado paginado** de personajes consumiendo `GET /api/character` con parámetros `page` y, opcionalmente, `name`.
- **Búsqueda por nombre** sincronizada con la URL (query params), con debounce en el navbar para limitar llamadas mientras se escribe.
- **Favoritos** con estado global (Zustand) y persistencia en `localStorage` bajo la clave `rm-favorites`; solo se almacena el recorte de datos necesario para la tarjeta (`CharacterCardData`).
- **Detalle en modal** desde la tarjeta, sin ruta adicional de detalle.
- **Estados de interfaz**: carga (skeletons), error de red/servidor, lista vacía o sin coincidencias; tratamiento explícito del `404` de la API como “sin resultados”.
- **Accesibilidad básica**: atributos `aria-*` y estructura pensada para lectura y foco razonables en listado y modal.

---

## Stack técnico

| Área            | Elección                                      |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 16 (App Router)                       |
| UI              | React 19, TypeScript 5                        |
| Datos remotos   | TanStack Query v5 (`staleTime` 60 s por defecto en `app/providers.tsx`) |
| Estado local    | Zustand + `persist` para favoritos            |
| Estilos         | Tailwind CSS v4                               |
| Componentes UI  | Radix + patrones shadcn (`components/ui/*`)   |

---

## Arquitectura y decisiones

1. **Capa de datos** (`services/characters.service.ts`): única función de acceso HTTP al endpoint de personajes; normalización del `404` de la API a respuesta vacía para no mezclar “sin resultados” con errores genéricos.
2. **Hook de listado** (`hooks/useCharacters.ts`): encapsula la query de TanStack (clave por página y nombre) para que la página no conozca detalles de caché ni de la URL de la API.
3. **Tipos** (`types/characterType.ts`): distinción entre el personaje completo (`Character`) y el subconjunto usado en tarjetas y favoritos, para no persistir ni propagar campos innecesarios.
4. **Página principal** (`app/page.tsx`): orquesta query params, estados de la lista, paginación, modal de detalle y filtro de “solo favoritos”.
5. **Layout** (`app/layout.tsx`): proveedores globales y `<Suspense>` alrededor del navbar donde hace falta por el uso de `useSearchParams`, evitando problemas de prerender en rutas internas (por ejemplo 404).

---

## Estructura del repositorio

```txt
app/
  layout.tsx          # Shell global, Providers, Suspense del navbar
  page.tsx            # Listado, filtros, modal, paginación
  providers.tsx       # QueryClientProvider y defaults de React Query

components/
  layout/             # navbar.tsx, footer.tsx
  characterCard.tsx
  characterCardSkeleton.tsx
  characterModal.tsx
  pagination.tsx
  ui/                 # Primitivas (button, card, dialog, input, …)

hooks/
  useCharacters.ts

services/
  characters.service.ts

store/
  favorites.store.ts

types/
  characterType.ts

lib/
  utils.ts            # Utilidades (p. ej. cn para clases)
```

---

## Posibles extensiones

Rutas dedicadas de detalle (`/character/[id]`), filtros adicionales soportados por la API, tests unitarios sobre el servicio y el hook, o integración con un gestor de estado servidor si el alcance creciera más allá del cliente.
