'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase, SiteConfig } from '@/lib/supabase'

function isVideo(url: string) { return /\.(mp4|webm|mov|m4v|ogv|ogg)(\?|#|$)/i.test(url || '') }

function HeroVideo({ url, priority, preloadValue = 'auto', poster }: { url: string; priority: boolean; preloadValue?: 'auto' | 'metadata' | 'none'; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const show = () => setReady(true)
    if (v.readyState >= 2) show()
    v.addEventListener('loadeddata', show, { once: true })
    return () => v.removeEventListener('loadeddata', show)
  }, [])

  const videoSrc = url.includes('#') ? url : `${url}#t=0.1`

  return (
    <video
      ref={ref}
      autoPlay loop muted playsInline
      preload={preloadValue}
      poster={poster}
      disableRemotePlayback
      className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      {...(priority ? { fetchPriority: 'high' } as any : {})}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}

export default function Hero({ config }: { config: SiteConfig[] }) {
  const get = (key: string) => config.find(c => c.key === key)?.value || ''
  const heroTitle = get('hero_title_main') || 'Costruiamo il Tuo'
  const heroHighlight = get('hero_title_highlight') || 'Futuro'
  const heroSubtitle = get('hero_subtitle') || 'Eccellenza, passione e professionalità nel settore edile. Dalla progettazione alla realizzazione, diamo forma alle tue idee con materiali di altissima qualità.'
  const posterUrl = get('hero_poster_url') || ''

  const buildSlots = [1, 2, 3, 4].map(i => {
    const specific = get(`hero_video_${i}`)
    return specific || get('hero_video') || ''
  })

  const [allSlots, setAllSlots] = useState(buildSlots)

  useEffect(() => {
    supabase.from('site_config').select('*').in('key', ['hero_video_1', 'hero_video_2', 'hero_video_3', 'hero_video_4', 'hero_video'])
      .then(({ data }) => {
        if (data && data.length > 0) {
          const g = (k: string) => data.find(c => c.key === k)?.value || ''
          const fresh = [1, 2, 3, 4].map(i => g(`hero_video_${i}`) || g('hero_video') || '')
          if (fresh.some(u => u)) setAllSlots(fresh)
        }
      })
  }, [])

  return (
    <section id="home" className="h-screen flex items-start sm:items-center relative overflow-hidden bg-gray-950">
      <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 w-full h-full">
        {allSlots.map((url, i) => {
          return (
            <div key={i} className="w-full h-full relative overflow-hidden bg-gray-950">
              {url && (isVideo(url) ? (
                <HeroVideo url={url} priority={i === 0} preloadValue="auto" poster={i === 0 ? posterUrl : undefined} />
              ) : (
                <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" loading={i === 0 ? 'eager' : 'lazy'} />
              ))}
            </div>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-32">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg mb-4 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Impresa Edile</span>
            <span className="text-sm text-white/40">/</span>
            <span className="text-sm font-semibold tracking-wide">Qualità &amp; Sicurezza</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-8 leading-[1.1] tracking-tight">
            <span>{heroTitle}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-brand to-brand-dark">{heroHighlight}</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-12 max-w-2xl leading-relaxed">{heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-16">
            <a href="#servizi" className="group bg-gradient-to-r from-brand to-brand-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg text-center shadow-2xl shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              Scopri i Servizi <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contatti" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">Richiedi Preventivo</a>
          </div>

          <div className="hidden sm:flex flex-wrap gap-8 sm:gap-12">
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
