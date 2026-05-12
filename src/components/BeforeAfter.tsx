'use client'
import { useRef, useCallback } from 'react'
import { BeforeAfter as BAType } from '@/lib/supabase'

function isVideo(url: string) { return /\.(mp4|webm|mov|m4v|ogv|ogg)(\?|#|$)/i.test(url || '') }

function BACard({ item }: { item: BAType }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const afterRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)

  const update = useCallback((val: number) => {
    const v = Math.max(0, Math.min(100, val))
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${v}%)`
    if (lineRef.current) lineRef.current.style.left = `${v}%`
    if (knobRef.current) knobRef.current.style.left = `${v}%`
  }, [])

  const handlePointer = useCallback((clientX: number) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const v = ((clientX - rect.left) / rect.width) * 100
    update(Math.max(0, Math.min(100, v)))
  }, [update])

  return (
    <div className="glass rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-300 border border-white/60">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="font-display text-2xl font-bold text-gray-900">{item.title || 'Prima & Dopo'}</h4>
          <p className="text-gray-600 text-sm mt-1">{item.category || 'Prima/Dopo'}</p>
        </div>
      </div>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-gray-200 cursor-ew-resize select-none touch-none"
        onPointerDown={e => {
          handlePointer(e.clientX)
          const move = (ev: PointerEvent) => handlePointer(ev.clientX)
          const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up) }
          document.addEventListener('pointermove', move)
          document.addEventListener('pointerup', up)
        }}
      >
        {isVideo(item.before_url)
          ? <video src={item.before_url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          : <img src={item.before_url} alt="Prima" className="absolute inset-0 w-full h-full object-cover" />
        }
        {isVideo(item.after_url)
          ? <video ref={afterRef as React.RefObject<HTMLVideoElement>} src={item.after_url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: 'inset(0 0 0 50%)' }} />
          : <img ref={afterRef as React.RefObject<HTMLImageElement>} src={item.after_url} alt="Dopo" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: 'inset(0 0 0 50%)' }} />
        }
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 text-white text-xs font-bold backdrop-blur">Prima</div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/55 text-white text-xs font-bold backdrop-blur">Dopo</div>
        <div ref={lineRef} className="absolute inset-y-0 left-1/2 w-[2px] bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.12)] pointer-events-none" />
        <div ref={knobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 border border-white shadow-xl flex items-center justify-center text-gray-900 pointer-events-none">
          <i className="fas fa-arrows-left-right" />
        </div>
      </div>
      <div className="mt-4">
        <input type="range" min="0" max="100" defaultValue="50" className="ba-range w-full" onChange={e => update(Number(e.target.value))} />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Prima</span><span>Dopo</span>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfter({ items }: { items: BAType[] }) {
  return (
    <section id="prima-dopo" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-2">Prima &amp; Dopo</h2>
          <h3 className="font-display text-4xl font-bold text-gray-900">Trasformazioni Reali</h3>
          <p className="text-gray-600 mt-4 text-lg">Confronta il risultato: sposta lo slider per vedere il prima e il dopo.</p>
          <div className="w-24 h-1 bg-brand mx-auto mt-6 rounded-full" />
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map(item => <BACard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center text-gray-500 font-medium mt-6">Sezione in aggiornamento: presto aggiungeremo nuove trasformazioni.</div>
        )}
      </div>
    </section>
  )
}
