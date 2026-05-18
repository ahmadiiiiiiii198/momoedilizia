'use client'
import { useState, useEffect, useRef } from 'react'
import { SiteConfig } from '@/lib/supabase'

function isVideo(url: string) { return /\.(mp4|webm|mov|m4v|ogv|ogg)(\?|#|$)/i.test(url || '') }

function HeroVideo({ url, priority, preloadValue = 'auto', poster }: { url: string; priority: boolean; preloadValue?: 'auto' | 'metadata' | 'none'; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const show = () => setReady(true)
    if (v.readyState >= 3) show()
    v.addEventListener('canplay', show, { once: true })
    return () => v.removeEventListener('canplay', show)
  }, [])

  // Generate webm URL by replacing .mp4/.MP4 with .webm
  const webmUrl = url.replace(/\.(mp4|MP4)$/, '.webm')

  return (
    <video
      ref={ref}
      autoPlay loop muted playsInline
      preload={preloadValue}
      poster={poster}
      disableRemotePlayback
      className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      {...(priority ? { fetchPriority: 'high' } as any : {})}
    >
      <source src={webmUrl} type="video/webm" />
      <source src={url} type="video/mp4" />
    </video>
  )
}

export default function Hero({ config }: { config: SiteConfig[] }) {
  const get = (key: string) => config.find(c => c.key === key)?.value || ''
  const heroTitle = get('hero_title_main') || 'Costruiamo il Tuo'
  const heroHighlight = get('hero_title_highlight') || 'Futuro'
  const heroSubtitle = get('hero_subtitle') || 'Eccellenza, passione e professionalità nel settore edile. Dalla progettazione alla realizzazione, diamo forma alle tue idee con materiali di altissima qualità.'
  const posterUrl = get('hero_poster_url') || ''

  const allSlots = [1, 2, 3, 4].map(i => {
    const specific = get(`hero_video_${i}`)
    return specific || get('hero_video') || ''
  })

  const [deferredReady, setDeferredReady] = useState(false)

  useEffect(() => {
    const urls = allSlots.filter(u => u && isVideo(u))
    if (urls.length > 0) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = new URL(urls[0]).origin
      document.head.appendChild(link)
    }
    const t = setTimeout(() => setDeferredReady(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 w-full h-full">
        {allSlots.map((url, i) => {
          const isDeferred = i >= 2
          const shouldRender = !isDeferred || deferredReady
          return (
            <div key={i} className="w-full h-full relative overflow-hidden bg-gray-950">
              {url && shouldRender && (isVideo(url) ? (
                <HeroVideo url={url} priority={i === 0} preloadValue={i === 0 ? 'auto' : 'none'} poster={i === 0 ? posterUrl : undefined} />
              ) : (
                <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" loading={i === 0 ? 'eager' : 'lazy'} />
              ))}
            </div>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-32">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Impresa Edile</span>
            <span className="text-sm text-white/40">/</span>
            <span className="text-sm font-semibold tracking-wide">Qualità &amp; Sicurezza</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            <span>{heroTitle}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-brand to-brand-dark">{heroHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">{heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#servizi" className="group bg-gradient-to-r from-brand to-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg text-center shadow-2xl shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              Scopri i Servizi <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contatti" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">Richiedi Preventivo</a>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-12">
            {[
              { num: '10+', label: 'Anni di Esperienza' },
              { num: '500+', label: 'Progetti Completati' },
              { num: '100%', label: 'Clienti Soddisfatti' },
            ].map((s, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-3xl font-display font-bold text-white">{s.num}</div>
                <div className="text-sm text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
