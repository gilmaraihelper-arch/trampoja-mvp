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

## Status
Em construção.
