import Link from 'next/link'

import { cn } from '@/utils/tailwind'

type Props = {
  href?: string
  className?: string
  /** When true, renders only the mark (no link). */
  asText?: boolean
}

export function BrandMark({ href = '/', className, asText }: Props) {
  const Mark = (
    <span className={cn('text-2xl font-bold tracking-tight', className)}>
      <span className="text-primary">tramp</span>
      <span className="text-secondary">oja</span>
    </span>
  )

  if (asText) return Mark

  return (
    <Link href={href} className="inline-flex items-center">
      {Mark}
    </Link>
  )
}
