'use client'

/* eslint-disable @next/next/no-img-element */

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Check,
  Clock,
  Link2,
  MapPin,
  Menu,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Para Freelancers', href: '#para-freelancers' },
    { label: 'Para Restaurantes', href: '#para-restaurantes' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container">
        <div className="section-inner flex items-center justify-between">
          {/* Logo (igual ao ZIP: texto, sem arquivo de imagem) */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <span className="text-primary">tramp</span>
            <span className={isScrolled ? 'text-secondary' : 'text-gray-900'}>
              oja
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="link-underline hover:text-primary text-sm font-medium text-gray-700 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button (no Kimi link é button) */}
          <div className="hidden lg:block">
            <button
              type="button"
              className="btn-primary text-sm"
              onClick={() => scrollToSection('#para-freelancers')}
            >
              Cadastrar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="hover:text-primary p-2 text-gray-700 transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`glass-effect absolute top-full right-0 left-0 border-t border-gray-100 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="section-container py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  scrollToSection(link.href)
                  setIsMobileMenuOpen(false)
                }}
                className="hover:text-primary py-2 text-left text-base font-medium text-gray-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              className="btn-primary mt-4 text-center text-sm"
              onClick={() => {
                scrollToSection('#para-freelancers')
                setIsMobileMenuOpen(false)
              }}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !imageRef.current) return

      const scrollY = window.scrollY
      const parallaxValue = scrollY * 0.3

      contentRef.current.style.transform = `translateY(${-parallaxValue}px)`
      imageRef.current.style.transform = `translateY(${-parallaxValue * 0.7}px) rotateY(${-scrollY * 0.02}deg)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50 pt-24 pb-16">
      {/* Decorative Elements */}
      <div className="animate-float bg-primary/10 absolute top-20 left-10 h-20 w-20 rounded-full" />
      <div className="animation-delay-200 animate-float bg-secondary/10 absolute bottom-40 left-1/4 h-12 w-12 rounded-full" />
      <div className="animation-delay-400 animate-float bg-primary/5 absolute top-1/3 right-1/4 h-16 w-16 rounded-full" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="section-inner">
          <div className="grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Content */}
            <div ref={contentRef} className="flex flex-col gap-8 pt-8 lg:pt-0">
              <div className="space-y-2">
                <h1 className="text-5xl leading-[1.1] font-bold text-gray-900 sm:text-6xl lg:text-7xl">
                  <span className="block overflow-hidden">
                    <span className="block animate-[slideUp_0.8s_ease-out_0.2s_both]">
                      Conectando
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="block animate-[slideUp_0.8s_ease-out_0.35s_both]">
                      Talentos e
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span className="text-primary block animate-[slideUp_0.8s_ease-out_0.5s_both]">
                      Restaurantes
                    </span>
                  </span>
                </h1>
              </div>

              <p
                className="max-w-xl animate-[fadeIn_0.6s_ease-out_0.8s_both] text-lg leading-relaxed text-gray-600 sm:text-xl"
                style={{ filter: 'blur(0px)' }}
              >
                A plataforma que une freelancers flexíveis a restaurantes que
                precisam de mão de obra qualificada de forma rápida e confiável.
              </p>

              <div className="flex animate-[fadeIn_0.5s_ease-out_1s_both] flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection('#para-freelancers')}
                  className="btn-primary group px-8 py-4 text-base"
                >
                  Quero Trabalhar
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection('#para-restaurantes')}
                  className="btn-secondary group px-8 py-4 text-base"
                >
                  Preciso de Gente
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex animate-[fadeIn_0.5s_ease-out_1.2s_both] items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="from-primary to-primary-light flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br text-xs font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="text-primary h-4 w-4" />
                  <span className="font-semibold text-gray-900">+10.000</span>
                  <span>freelancers cadastrados</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div
              ref={imageRef}
              className="perspective-1000 relative animate-[fadeIn_1s_ease-out_0.4s_both]"
            >
              <div className="preserve-3d relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/hero-illustration.jpg"
                    alt="Freelancers e restaurantes conectados"
                    width={1400}
                    height={900}
                    priority
                    className="h-auto w-full object-cover"
                  />

                  <div className="from-secondary/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>

                <div className="animation-delay-200 shadow-card animate-float absolute -bottom-6 -left-6 rounded-xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <span className="text-primary text-2xl font-bold">
                        95%
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Satisfação
                      </p>
                      <p className="text-xs text-gray-500">dos usuários</p>
                    </div>
                  </div>
                </div>

                <div className="shadow-card animate-float absolute -top-4 -right-4 rounded-xl bg-white p-4">
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
                    <span className="text-sm font-semibold text-gray-900">
                      4.9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

function ClientLogos() {
  const logos = [
    { label: 'Bistro Central' },
    { label: 'Café do Ponto' },
    { label: 'Pizza Italia' },
    { label: 'Sushi House' },
    { label: 'Gelato Art' },
    { label: 'Burger King' },
    { label: 'Bistro Central' },
    { label: 'Café do Ponto' },
    { label: 'Pizza Italia' },
    { label: 'Sushi House' },
    { label: 'Gelato Art' },
    { label: 'Burger King' },
  ]

  // “Icons” (no Kimi link eles são imagens). Aqui usamos glyphs neutros.
  const iconGlyphs = ['🍽️', '☕', '🍕', '🍣', '🍨', '🍔']

  return (
    <section className="w-full bg-white py-16">
      <div className="section-container">
        <div className="section-inner">
          <p className="mb-10 text-center text-sm font-medium tracking-wider text-gray-500 uppercase">
            Restaurantes que confiam na gente
          </p>
          <div className="grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-6 text-sm font-semibold text-gray-500"
              >
                <span aria-hidden className="text-base">
                  {iconGlyphs[idx % iconGlyphs.length]}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: UserPlus,
      title: 'Cadastre-se',
      description:
        'Crie seu perfil em menos de 5 minutos. Seja você um freelancer ou dono de restaurante.',
      color: 'from-primary to-primary-light',
    },
    {
      icon: Link2,
      title: 'Conecte-se',
      description:
        'Freelancers disponíveis encontram oportunidades. Restaurantes publicam vagas rapidamente.',
      color: 'from-secondary to-secondary/70',
    },
    {
      icon: Briefcase,
      title: 'Trabalhe',
      description:
        'Combine os detalhes, trabalhe e receba. Avaliações garantem qualidade para todos.',
      color: 'from-primary to-primary-light',
    },
  ]

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="w-full bg-gray-50 py-24"
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className={`mb-6 text-4xl font-bold text-gray-900 transition-all duration-700 sm:text-5xl ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              Como Funciona
            </h2>
            <p
              className={`text-lg text-gray-600 transition-all delay-100 duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              Em poucos passos, você começa a trabalhar ou encontra os melhores
              talentos
            </p>
          </div>

          <div className="perspective-1000 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`preserve-3d group shadow-card hover:shadow-card-hover relative rounded-2xl bg-white p-8 transition-all duration-500 hover:-translate-y-3 ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  <div className="group-hover:bg-primary absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-400 transition-colors duration-300 group-hover:text-white">
                    {index + 1}
                  </div>

                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  <div className="group-hover:border-primary/20 absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300" />

                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 z-10 hidden translate-x-full -translate-y-1/2 transform md:block">
                      <ArrowRight className="text-primary/30 h-6 w-6" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div
            className={`mt-16 text-center transition-all delay-700 duration-700 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="mb-4 text-gray-600">Pronto para começar?</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/gigs" className="btn-primary text-center">
                Criar Perfil Grátis
              </Link>
              <button className="btn-secondary">Saber Mais</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ForFreelancers() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: Clock,
      title: 'Flexibilidade total de horários',
      description: 'Trabalhe quando quiser, escolha seus próprios horários',
    },
    {
      icon: Shield,
      title: 'Pagamento garantido e seguro',
      description: 'Receba pelo seu trabalho de forma rápida e protegida',
    },
    {
      icon: Star,
      title: 'Avaliações que valorizam seu trabalho',
      description: 'Construa sua reputação e ganhe mais oportunidades',
    },
    {
      icon: MapPin,
      title: 'Oportunidades próximas à sua localização',
      description: 'Encontre trabalhos perto de você',
    },
  ]

  return (
    <section
      id="para-freelancers"
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-24"
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div
              className={`relative transition-all duration-1000 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="perspective-1000 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0 lg:-rotate-2">
                  {/* Mantido igual ao ZIP: imagem externa */}
                  <img
                    src="https://media.istockphoto.com/id/1394055240/photo/happy-black-female-chef-preparing-food-in-frying-pan-at-restaurant-kitchen.jpg?s=612x612&w=0&k=20&c=6DjpoYqgYVDLmtj3-q7H7wvoiwkVgzi1rn7a_XUZ_Ng="
                    alt="Chef freelancer trabalhando"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="bg-primary/10 absolute -right-6 -bottom-6 -z-10 h-32 w-32 rounded-full" />
                <div className="bg-secondary/10 absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full" />

                <div className="shadow-card animate-float absolute -bottom-4 -left-4 rounded-xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">2.5k+</p>
                      <p className="text-xs text-gray-500">
                        Trabalhos realizados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className={`transition-all delay-200 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <span className="bg-primary/10 text-primary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold">
                  Para Freelancers
                </span>
                <h2 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl">
                  Trabalhe com{' '}
                  <span className="text-primary">flexibilidade</span> e{' '}
                  <span className="text-primary">segurança</span>
                </h2>
              </div>

              <p
                className={`text-lg text-gray-600 transition-all delay-300 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                Seja dono do seu tempo e escolha os projetos que mais combinam
                com você. Na Trampoja, você tem liberdade para trabalhar quando
                e onde quiser.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className={`group cursor-pointer rounded-xl p-4 transition-all duration-500 hover:bg-gray-50 ${
                        isVisible
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 group-hover:bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                          <Icon className="text-primary h-6 w-6 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="group-hover:text-primary mb-1 font-semibold text-gray-900 transition-colors duration-300">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div
                className={`pt-4 transition-all delay-800 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <Link href="/gigs" className="btn-primary group inline-flex">
                  Criar Perfil de Freelancer
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ForRestaurants() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: Users,
      title: 'Encontre staff qualificado em minutos',
      description:
        'Acesse uma rede de freelancers verificados e prontos para trabalhar',
    },
    {
      icon: TrendingDown,
      title: 'Reduza custos com contratação',
      description: 'Pague apenas pelo que precisa, sem custos fixos de RH',
    },
    {
      icon: Star,
      title: 'Avalie e construa sua equipe ideal',
      description:
        'Sistema de avaliações para encontrar os melhores profissionais',
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidade para picos de demanda',
      description: 'Aumente sua equipe rapidamente nos dias de maior movimento',
    },
  ]

  return (
    <section
      id="para-restaurantes"
      ref={sectionRef}
      className="w-full overflow-hidden bg-gray-50 py-24"
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 space-y-8 lg:order-1">
              <div
                className={`transition-all delay-200 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <span className="bg-secondary/10 text-secondary mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold">
                  Para Restaurantes
                </span>
                <h2 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl">
                  Encontre{' '}
                  <span className="text-secondary">staff qualificado</span> em
                  minutos
                </h2>
              </div>

              <p
                className={`text-lg text-gray-600 transition-all delay-300 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                Não perca mais clientes por falta de mão de obra. Com a
                Trampoja, você encontra freelancers confiáveis e qualificados
                para qualquer ocasião.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className={`group cursor-pointer rounded-xl p-4 transition-all duration-500 hover:bg-white ${
                        isVisible
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 group-hover:bg-secondary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                          <Icon className="text-secondary h-6 w-6 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="group-hover:text-secondary mb-1 font-semibold text-gray-900 transition-colors duration-300">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div
                className={`pt-4 transition-all delay-800 duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <Link
                  href="/restaurant"
                  className="btn-primary group bg-secondary hover:bg-secondary/90 inline-flex"
                >
                  Publicar Vaga Agora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div
              className={`relative order-1 transition-all duration-1000 lg:order-2 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="perspective-1000 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0 lg:rotate-2">
                  <img
                    src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208273.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Equipe de restaurante trabalhando"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="bg-secondary/10 absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full" />
                <div className="bg-primary/10 absolute -top-6 -right-6 -z-10 h-24 w-24 rounded-full" />

                <div className="animation-delay-200 shadow-card animate-float absolute -right-4 -bottom-4 rounded-xl bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <TrendingUp className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">15min</p>
                      <p className="text-xs text-gray-500">
                        Tempo médio de match
                      </p>
                    </div>
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

function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const items = [
    {
      quote:
        '"Consegui trabalhos flexíveis que se adaptam à minha rotina de estudante. A plataforma é super intuitiva!"',
      name: 'Ana Carolina',
      role: 'Garçonete Freelancer',
      initials: 'AC',
      tint: 'from-primary to-primary-light',
    },
    {
      quote:
        '"Em dias de pico, encontro staff confiável em minutos. Salvou meu restaurante várias vezes!"',
      name: 'Roberto Silva',
      role: 'Dono de Restaurante',
      initials: 'RS',
      tint: 'from-secondary to-secondary/70',
    },
    {
      quote:
        '"Avaliações transparentes me ajudaram a construir uma reputação e conseguir mais oportunidades."',
      name: 'Marcos Oliveira',
      role: 'Chef Freelancer',
      initials: 'MO',
      tint: 'from-primary to-primary-light',
    },
    {
      quote:
        '"Reduzi em 40% os custos com folha de pagamento usando freelancers nos dias de maior demanda."',
      name: 'Juliana Costa',
      role: 'Gerente de Restaurante',
      initials: 'JC',
      tint: 'from-secondary to-secondary/70',
    },
  ]

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="w-full bg-white py-24"
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className={`mb-6 text-4xl font-bold text-gray-900 transition-all duration-700 sm:text-5xl ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              O Que Dizem Nossos Usuários
            </h2>
            <p
              className={`text-lg text-gray-600 transition-all delay-100 duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              Histórias reais de freelancers e restaurantes que se conectaram
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((t, index) => (
              <div
                key={index}
                className={`card-hover relative rounded-2xl bg-gray-50 p-8 transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                {/* top image placeholder */}
                <div className="mb-6 overflow-hidden rounded-xl bg-white">
                  <div className="h-28 w-full bg-gradient-to-br from-gray-100 to-gray-50" />
                </div>

                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">{t.quote}</p>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.tint} text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const faqs = [
    {
      q: 'Como me cadastro como freelancer?',
      a: 'O cadastro é simples e leva menos de 5 minutos. Clique em "Quero Trabalhar", preencha seus dados, adicione suas habilidades e comece a se candidatar às vagas disponíveis na sua região.',
    },
    {
      q: 'Quanto custa para restaurantes publicarem vagas?',
      a: 'Oferecemos planos flexíveis. Você pode começar gratuitamente com vagas básicas ou escolher um plano premium para mais visibilidade e funcionalidades avançadas.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'O pagamento é processado de forma segura pela plataforma. O freelancer recebe após a conclusão do trabalho, e o restaurante só paga quando o serviço é confirmado.',
    },
    {
      q: 'Posso escolher meus horários?',
      a: 'Sim! Como freelancer, você tem total flexibilidade para escolher quando quer trabalhar. Veja as vagas disponíveis e se candidate apenas nas que se encaixam na sua agenda.',
    },
    {
      q: 'Como garantem a qualidade dos freelancers?',
      a: 'Todos os freelancers passam por uma verificação de perfil. Além disso, o sistema de avaliações permite que restaurantes avaliem o trabalho, criando uma comunidade de confiança.',
    },
  ]

  return (
    <section id="faq" ref={sectionRef} className="w-full bg-gray-50 py-24">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            {/* left support card */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="shadow-card overflow-hidden rounded-3xl bg-white">
                <div className="h-56 w-full bg-gradient-to-br from-orange-50 to-emerald-50" />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    Ainda tem dúvidas?
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Nossa equipe está pronta para ajudar você.
                  </p>
                  <button className="btn-secondary mt-6 w-full">
                    Falar com suporte →
                  </button>
                </div>
              </div>
            </div>

            {/* right FAQ */}
            <div>
              <h2
                className={`mb-6 text-4xl font-bold text-gray-900 transition-all duration-700 sm:text-5xl ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                Dúvidas Frequentes
              </h2>

              <div className="space-y-4">
                {faqs.map((item, index) => {
                  const isOpen = openIndex === index
                  return (
                    <div
                      key={index}
                      className={`shadow-card overflow-hidden rounded-2xl bg-white transition-all duration-700 ${
                        isVisible
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${200 + index * 120}ms` }}
                    >
                      <button
                        className="flex w-full items-center justify-between gap-4 p-6 text-left"
                        onClick={() =>
                          setOpenIndex((v) => (v === index ? null : index))
                        }
                      >
                        <span className="text-lg font-semibold text-gray-900">
                          {item.q}
                        </span>
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 ${
                            isOpen ? 'bg-primary rotate-45 text-white' : ''
                          }`}
                          aria-hidden
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 text-gray-600">
                            {item.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section className="w-full bg-white py-24">
      <div className="section-container">
        <div className="section-inner">
          <div className="from-primary via-primary to-secondary relative overflow-hidden rounded-3xl bg-gradient-to-br p-10 text-white sm:p-14">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.25) 0, transparent 35%)',
              }}
            />

            {/* top-left label */}
            <div className="absolute top-10 left-10 hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-white/80" />
              Comece hoje mesmo
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
                Pronto para Começar?
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-white/85">
                Junte-se a milhares de freelancers e restaurantes que já estão
                transformando a forma de trabalhar no setor de alimentação.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/gigs"
                  className="btn-secondary bg-white text-gray-900"
                >
                  Quero Trabalhar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/restaurant"
                  className="btn-primary bg-secondary hover:bg-secondary/90"
                >
                  Preciso de Gente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <span aria-hidden>✅</span>
                  <span className="font-semibold">Cadastro gratuito</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <span aria-hidden>💸</span>
                  <span className="font-semibold">Sem taxa de adesão</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                  <span aria-hidden>🕘</span>
                  <span className="font-semibold">Suporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full bg-white py-16">
      <div className="section-container">
        <div className="section-inner">
          <div className="grid gap-10 border-t border-gray-100 pt-12 lg:grid-cols-[1.2fr_.9fr_.9fr_.9fr_1.2fr]">
            {/* brand */}
            <div>
              <Link href="#" className="text-xl font-bold">
                <span className="text-primary">tramp</span>
                <span className="text-gray-900">oja</span>
              </Link>
              <p className="mt-3 max-w-sm text-sm text-gray-500">
                Conectando talentos e restaurantes desde 2023. A plataforma que
                transforma a forma de trabalhar no setor de alimentação.
              </p>
              <div className="mt-5 flex items-center gap-3 text-gray-400">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="rounded-lg p-2 hover:bg-gray-50"
                >
                  ◎
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="rounded-lg p-2 hover:bg-gray-50"
                >
                  ◇
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="rounded-lg p-2 hover:bg-gray-50"
                >
                  ▣
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="rounded-lg p-2 hover:bg-gray-50"
                >
                  ⌁
                </a>
              </div>
            </div>

            {/* columns */}
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Para Freelancers
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a className="hover:text-primary" href="#como-funciona">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#para-freelancers">
                    Criar Perfil
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Vagas Disponíveis
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Dicas e Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Para Restaurantes
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a className="hover:text-primary" href="#para-restaurantes">
                    Publicar Vaga
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Planos e Preços
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Cases de Sucesso
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Central de Ajuda
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">Empresa</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>
                  <a className="hover:text-primary" href="#">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <Link className="hover:text-primary" href="/contato">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" href="/termos">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-primary" href="/privacidade">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* newsletter */}
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Fique por Dentro
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                Receba as últimas vagas e novidades diretamente no seu e-mail.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <input
                  placeholder="Seu e-mail"
                  className="focus:border-primary h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none"
                />
                <button className="btn-primary h-11 px-5">
                  Inscrever
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-8 text-sm text-gray-500 md:flex-row md:items-center">
            <p>© 2026 Trampoja. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <Link href="/termos" className="hover:text-primary">
                Termos de Serviço
              </Link>
              <Link href="/privacidade" className="hover:text-primary">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <ClientLogos />
        <HowItWorks />
        <ForFreelancers />
        <ForRestaurants />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
