'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Briefcase, Home, LayoutGrid, Store } from 'lucide-react'

import { cn } from '@/utils/tailwind'

type Tab = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  match?: (pathname: string) => boolean
}

const tabs: Tab[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    match: (p) => p === '/',
  },
  {
    href: '/gigs',
    label: 'Vagas',
    icon: Briefcase,
    match: (p) => p === '/gigs' || p.startsWith('/gigs/'),
  },
  {
    href: '/me',
    label: 'Minha área',
    icon: LayoutGrid,
    match: (p) => p === '/me' || p.startsWith('/me/'),
  },
  {
    href: '/restaurant',
    label: 'Restaurante',
    icon: Store,
    match: (p) => p === '/restaurant' || p.startsWith('/restaurant/'),
  },
]

export function MobileTabBar() {
  const pathname = usePathname() || '/'

  return (
    <nav
      aria-label="Navegação"
      className="supports-[backdrop-filter]:bg-background/70 bg-background/85 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        {tabs.map((t) => {
          const active = t.match ? t.match(pathname) : pathname === t.href
          const Icon = t.icon

          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                'flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium',
                active
                  ? 'text-foreground bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/60',
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
