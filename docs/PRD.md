# Task Assignment Management System — PRD

**Version:** 2.0 (clean rebuild)  
**Last updated:** 2026‑09‑04  
**Owner:** Faisal Fakhri (@boy.fachruri)  
**Target users:** IFCA team — consultants, programmers, manager  
**Status:** Approved for rebuild from scratch

---

## 1. Executive Summary

Replace the existing `Documents/IFCA KM+.xlsx` spreadsheet as the **primary UI** for task management, while keeping **Google Sheets `TEAM ARI`** as the authoritative database (MVP) and **Supabase (PostgreSQL + Storage)** as the long‑term backing store. UI is a single‑page React 19 + Vite app, deployed to GitHub Pages, with a dark glassmorphism design ("Varian C").

The previous v1 build (`faisalFakhri/task-assignment-system`) suffered from a persistent `useState is not defined` runtime error that left the page blank. v2 is a clean rebuild that enforces stricter build validation, frozen dependency versions, and a one‑way `Web → Sheets` sync model.

---

## 2. Goals & Non‑Goals

### Goals (v2)
1. Manage tasks — create, read, update, archive.
2. Track consultant, client, programmer, status, deadline, notes, attachments.
3. Preserve history — completed/archived tasks searchable.
4. Search & filter by client, status, deadline, full‑text.
5. One‑way sync `Web → Sheets`.
6. Attachments via Supabase Storage (5 MB max).
7. Dark glassmorphism UI (Varian C).
8. Zero‑downtime deploy.
9. Per‑user preferences (font, walker off by default).

### Non‑Goals
- Two‑way `Sheets → Web` sync.
- Internal auth.
- WhatsApp/Telegram notifications.
- Real‑time collaboration.

---

## 3. Personas

| Persona | Daily need | Pain today |
|---------|------------|------------|
| **Sawi / Consultant** | Create tasks, assign to programmer | Re-type same task in Excel |
| **Programmer** | See queue of `Open`/`Assign` tasks | Manual status update forgotten |
| **Manager** | Overdue report, audit trail | No view; eyeball conditional formatting |

---

## 4. Core Features

### Task lifecycle
```
Open → Assign → In Progress → QC → Done
                              ↘ Hold / Reopen / Reject / Archive
```

### Fields
- consultant, client, programmer, type, screenReport, request, status, targetDate, notes, attachments[]

### One‑way sync `Web → Sheets`

```
Web (React) → Supabase → Edge Function → Sheets API v4 → Google Sheets TEAM ARI
```

Column mapping:
| Col | Field | Notes |
|-----|-------|-------|
| A | No | max(A)+1 |
| B | Tanggal | d/m/yyyy |
| C | Consultant | |
| D | Client | |
| E | Screen/Report | |
| F | Request | |
| G | Status | |
| H | Programmer | |
| I | SQL Server | |
| J | Database | |
| K | Target Date | d/m/yyyy |
| L | Sisa Hari | formula =IFERROR(K<TODAY();"";K-TODAY()) |
| M | Keterangan | notes + [TASK-xxx] tag |

Dedup: if `[TASK-xxx]` exists in M, `create` → `update`.

---

## 5. Architecture

```
GitHub Pages (SPA) → React 19 + Vite 8 + Tailwind 4 → Supabase (Postgres + Storage + Edge Functions)
```

---

## 6. Data Model

```sql
clients (id uuid pk, name text unique, active bool default true)
consultants (id uuid pk, name text unique, active bool default true)
programmers (id uuid pk, name text unique, active bool default true)
tasks (
  id uuid pk default gen_random_uuid(),
  task_id text unique,
  consultant text not null,
  client text not null,
  programmer text,
  type text check (type in ('Bugs','Improvements')),
  screen_report text not null,
  request text not null,
  status text check (status in ('Open','Assign','In Progress','QC','Hold','Reopen','Reject','Done')),
  sql_server text,
  database_name text,
  target_date date,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  archived bool default false
)
attachments (id uuid pk, task_id uuid references tasks(id), file_url text, file_name text, uploaded_at timestamptz default now())
```

---

## 7. API Surface

| Function | Method | Purpose |
|----------|--------|---------|
| sync-to-sheets | POST | Mirror task create/update/archive |
| notify-wa (deferred) | POST | Future: WhatsApp |

---

## 8. UI / UX

- 248px sidebar + main layout (drawer mobile)
- Dark: `#020617` + violet/cyan mesh
- glass tokens: `.glass`, `.glass-strong`, `.glass-subtle`

---

## 9. Milestones

| # | Milestone Check |
|---|----------------|
| M0 | Vite skeleton loads blank route |
| M1 | Supabase wired |
| M2 | Master CRUD pages |
| M3 | Tasks page with attachments |
| M4 | sync-to-sheets deployed + CORS fixed |
| M5 | Font picker + walker (off default) |
| M6 | Manual Book + polish |
| M7 | Deploy to GitHub Pages |

---

## 10. Validation Gate

Pre‑commit hook enforces:
- No `useState(` without `import ... from 'react'` in any `.tsx` file
- Vite build OK
- `.gitignore` excludes `dist/`, `*.json` (except tracked configs)
No `console.log`.

---

## 11. Risks

| Risk | Mitigation |
|------|-----------|
| Cache stale bundle | Hashed JS filenames |
| CORS on sync | Smoke test in `npm run check:sheets` |
| `useState` no import | Hook blocks commit |
| History lost | Back up `TEAM ARI` first |
| Timezone drift | Hardcode `=TODAY()` in formula |

---

**End of PRD v2.0**
