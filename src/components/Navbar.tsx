'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#chi-siamo', label: 'Chi Siamo' },
  { href: '#galleria', label: 'Galleria' },
  { href: '#prima-dopo', label: 'Prima & Dopo' },
  { href: '#sedi', label: 'Sedi' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = links.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) { setActive(`#${sections[i]}`); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_40px_rgba(0,0,0,0.04)] border-b border-gray-200/40' : 'bg-white/50 backdrop-blur-xl border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px] items-center">
          <a href="#home" className="flex-shrink-0 flex items-center gap-3 group">
            <Image src="/icon.png" alt="Gruppo Momo Edilizia" width={48} height={48} className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" priority />
            <div className="font-display font-bold flex flex-col leading-none">
              <span className="text-dark text-xl tracking-[0.2em]">GRUPPO</span>
              <span className="text-brand uppercase text-sm tracking-wider">Momo Edilizia</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active === l.href ? 'text-brand' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'}`}>
                {l.label}
                {active === l.href && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand rounded-full" />}
              </a>
            ))}
            <a href="#contatti" className="ml-4 bg-gradient-to-r from-brand to-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-px transition-all duration-300">
              Contattaci
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
            <i className={`fas ${open ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>
        </div>
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
          <div className="bg-white rounded-2xl px-2 py-2 flex flex-col gap-1 shadow-xl border border-gray-100">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active === l.href ? 'bg-brand/10 text-brand' : 'text-gray-700 hover:bg-gray-50'}`}>
                {l.label}
              </a>
            ))}
            <a href="#contatti" onClick={() => setOpen(false)} className="mt-1 bg-gradient-to-r from-brand to-brand-dark text-white px-4 py-3 rounded-xl text-sm font-semibold text-center shadow-md">Contattaci</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
