import Link from 'next/link'

import { cn } from '@/utils/tailwind'
import { Button } from '@/components/ui/button'
import { MobileTabBar } from '@/components/trampoja/mobile-tab-bar'
import { BrandMark } from '@/components/trampoja/brand-mark'

type AppShellProps = {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="bg-background text-foreground min-h-dvh">
      <header className="supports-[backdrop-filter]:bg-background/70 bg-background/85 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <BrandMark />

          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/gigs">Vagas</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main
        className={cn(
          'mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:py-10 md:pb-10',
          className,
        )}
      >
        {children}
      </main>

      <footer className="hidden border-t py-10 md:block">
        <div className="text-muted-foreground mx-auto max-w-6xl px-4 text-sm">
          TrampoJá • MVP (Freelancer) — Curitiba
        </div>
      </footer>

      <MobileTabBar />
    </div>
  )
}
