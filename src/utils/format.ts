export function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function calcHours(startIso: string, endIso: string) {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime()
  return Math.max(0, ms / (1000 * 60 * 60))
}

export function estimateTotalPay(params: {
  payPerHour: number
  bonus?: number
  startsAt: string
  endsAt: string
}) {
  const hours = calcHours(params.startsAt, params.endsAt)
  return (
    Math.round((hours * params.payPerHour + (params.bonus ?? 0)) * 100) / 100
  )
}
