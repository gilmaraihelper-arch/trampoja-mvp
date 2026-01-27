'use client'

import { useState } from 'react'

import { createClient } from '@/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function MagicLinkForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setStatus('sending')

    const supabase = createClient()

    try {
      const origin = window.location.origin
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/confirm?next=/gigs`,
        },
      })
      if (error) throw error
      setStatus('sent')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar o link')
      setStatus('idle')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
          Vamos mandar um link mágico para o seu e-mail. Sem senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'sent' ? (
          <div className="space-y-2">
            <p className="text-sm">
              Link enviado para <span className="font-medium">{email}</span>.
            </p>
            <p className="text-muted-foreground text-sm">
              Abra seu e-mail e clique no link para continuar.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setStatus('idle')}
            >
              Enviar novamente
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {error ? <p className="text-destructive text-sm">{error}</p> : null}

            <Button
              type="submit"
              className="w-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar link mágico'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
