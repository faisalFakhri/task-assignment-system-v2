# Task Assignment Management System v2.0

Clean rebuild — React 19, Vite 8, TypeScript, Tailwind 4 (Varian C glassmorphism).

## Quick Start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build    # includes tsc --noEmit + vite build
npm run preview
```

## Lint

```bash
npm run lint            # tsc type-check + hook validator
npm run lint:hooks      # hook import checker only
```

## Project Structure

```
src/
├── main.tsx          # React 19 createRoot + HashRouter
├── App.tsx           # Route definitions
├── index.css         # Tailwind + glass tokens (.glass/.glass-strong/.glass-subtle)
├── lib/supabase.ts   # Supabase client
├── types/            # Shared TypeScript types
├── data/             # Static data (nav, fonts)
├── components/       # UI components (MasterDataTable, FontPicker, StatusBadge, etc.)
├── hooks/            # Custom hooks (useMasterData)
├── layouts/          # AppLayout (sidebar + header)
└── pages/            # Route pages (Dashboard, Tasks, MasterData, etc.)

supabase/
└── functions/sync-to-sheets/
    └── index.ts      # Edge Function: Web → Google Sheets (1 arah)

docs/
└── SHEETS_SYNC.md    # Supabase → Sheets sync setup guide

scripts/
└── check-hooks.mjs   # React hooks import validator
```

## Features

- **Glassmorphism UI**: Varian C dark theme (`#020617` mesh violet/cyan)
- **Master Data CRUD**: Clients / Consultants / Programmers via Supabase
- **Font Picker**: 17 font options with live preview
- **Sheets Sync**: One-way Web → Sheets via Supabase Edge Function
- **Footer Walker**: Cat animation at footer (OFF by default)

## Environment Variables

Copy `.env.example` to `.env.local`:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## License

Internal use — IFCA Group
