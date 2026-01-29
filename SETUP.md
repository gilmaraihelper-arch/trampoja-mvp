# TrampoJá MVP — Setup (local)

Fonte da verdade: `origin/main`.

## Requisitos
- Node (recomendado via `corepack`)
- pnpm

```bash
corepack enable || true
```

## Rodar local

1) Instalar deps:
```bash
pnpm install
```

2) (Opcional) Configurar env:
```bash
cp .env.example .env.local
```

3) Migrar banco (SQLite local em `./.data/trampoja.db`):
```bash
pnpm db:migrate
```

> Observação: o script cria `./.data/` automaticamente.

4) Subir o app:
```bash
pnpm dev
```

Abra: http://localhost:3000

## Resetar repo local (se algo travar pull)

```bash
git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd
```
