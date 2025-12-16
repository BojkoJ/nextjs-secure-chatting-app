# Soukromý Chat

Jednoduchá a bezpečná chatovací aplikace pro dva lidi. Chatovací místnost je dočasná — po 15 minutách se automaticky smaže. Tři minuty před vypršením je zobrazeno upozornění s možností ručně prodloužit životnost místnosti.

## Hlavní funkce

- **Soukromé místnosti pro 2 uživatele** — žádné skupinové chaty, pouze přímá komunikace mezi dvěma osobami
- **Automatické mazání po 15 minutách** — po vypršení je místnost i všechny zprávy smazána
- **Notifikace před smazáním** — 3 minuty před koncem je zobrazeno upozornění s možností prodloužení
- **Real-time komunikace** — zprávy jsou doručovány okamžitě přes WebSockety

## Tech stack

| Kategorie | Technologie |
|-----------|-------------|
| Jazyk | TypeScript 5 |
| Frontend | Next.js 15, React 19, TailwindCSS |
| Backend | Elysia (HTTP framework s end-to-end type safety) |
| State & Forms | TanStack React Query, React Hook Form, Zod |
| Real-time | WebSockety (Pusher) |
| Databáze | Redis (Upstash) |
| Auth | NextAuth |
| Kvalita kódu | ESLint |

## Spuštění lokálně

#### Je třeba mít nainstalovaný Bun JavaScript Runtime

#### 1. Vytvořit .env, překopírovat do něj obsah .env.example a vyplnit správnými klíči.

#### 2. Nainstalovat dependencies a spustit projekt:

```bash
# Instalace závislosti
bun install

# Spuštění dev serveru
bun dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000).
