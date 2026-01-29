'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

export function LandingHero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !imageRef.current) return

      const scrollY = window.scrollY
      const parallaxValue = scrollY * 0.15

      contentRef.current.style.transform = `translateY(${-parallaxValue}px)`
      imageRef.current.style.transform = `translateY(${-parallaxValue * 0.7}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50 pt-10 pb-16">
      <div className="absolute top-20 left-10 h-20 w-20 animate-float rounded-full bg-primary/10" />
      <div className="animation-delay-200 absolute bottom-40 left-1/4 h-12 w-12 animate-float rounded-full bg-primary/5" />
      <div className="animation-delay-400 absolute top-1/3 right-1/4 h-16 w-16 animate-float rounded-full bg-primary/5" />

      <div className="section-container relative z-10">
        <div className="section-inner">
          <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div ref={contentRef} className="flex flex-col gap-8 pt-8 lg:pt-0">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold leading-[1.05] text-gray-900 sm:text-6xl lg:text-7xl">
                  <span className="block">Conectando</span>
                  <span className="block">Talentos e</span>
                  <span className="block text-primary">Restaurantes</span>
                </h1>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                A plataforma que une freelancers flexíveis a restaurantes que precisam de mão de obra qualificada de forma rápida e confiável.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/gigs" className="btn-primary text-base px-8 py-4">
                  Quero Trabalhar
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/restaurant" className="btn-secondary text-base px-8 py-4">
                  Preciso de Gente
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-primary-foreground"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-gray-900">+10.000</span>
                  <span>freelancers cadastrados</span>
                </div>
              </div>
            </div>

            <div ref={imageRef} className="relative perspective-1000">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/hero-illustration.jpg"
                    alt="Freelancers e restaurantes conectados"
                    width={1200}
                    height={900}
                    className="h-auto w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>

                <div className="animation-delay-200 absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-2xl font-bold text-primary">95%</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Satisfação</p>
                      <p className="text-xs text-gray-500">dos usuários</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 rounded-xl bg-white p-4 shadow">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-current text-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
