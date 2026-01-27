# TrampoJá — MVP (Curitiba)

Marketplace de **taxas/turnos** para restaurantes, com foco inicial em **Curitiba-PR**.

## Objetivo do MVP

### Freelancer (PWA)
- Ver vagas/plantões
- Candidatar-se
- Receber oferta e aceitar
- Check-in / Check-out
- Confirmar pagamento (Pix/dinheiro fora do app; confirmação dupla)
- Avaliar restaurante

### Restaurante (Painel web)
- Criar vaga/plantão (com quantidade)
- Ver candidatos e aprovar
- Validar conclusão
- Confirmar pagamento
- Avaliar freelancer

## Stack
- Next.js + TypeScript
- Supabase (Auth/DB/Storage)
- Tailwind + shadcn/ui

## Dev (local)

1) Instale dependências:
```bash
pnpm i
```

2) Copie o env:
```bash
cp .env.example .env.local
```

3) Rode:
```bash
pnpm dev
```

## Protótipo navegável (sem backend)

Para demo rápida dos fluxos (Freelancer ↔ Restaurante), use a pasta `prototype/`.

### GitHub Pages (link público)
Este repo tem workflow de Pages para publicar `prototype/` automaticamente quando houver push em `main`.

Depois de habilitar **Settings → Pages → Source: GitHub Actions**, o link vai aparecer ali.

### Rodar local
```bash
cd prototype
npx serve -s . -l 5173
```
Abra: http://localhost:5173/

> Dica: se o PWA ficar “cacheado”, use o botão **Resetar protótipo** em Freelancer → Perfil.

## Status
Em construção.
