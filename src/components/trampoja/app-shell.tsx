import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/utils/tailwind'
import { Button } from '@/components/ui/button'

type AppShellProps = {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="bg-background text-foreground min-h-dvh">
      <header className="supports-[backdrop-filter]:bg-background/70 bg-background/85 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/trampoja-wordmark-v1-light.svg"
              alt="TrampoJá"
              width={160}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav className="flex items-center gap-1">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/gigs">Vagas</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className={cn('mx-auto w-full max-w-6xl px-4 py-10', className)}>
        {children}
      </main>

      <footer className="border-t py-10">
        <div className="text-muted-foreground mx-auto max-w-6xl px-4 text-sm">
          TrampoJá • MVP (Freelancer) — Curitiba
        </div>
      </footer>
    </div>
  )
}
