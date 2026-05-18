'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Project } from '@/lib/supabase'

function isVideo(url: string) { return /\.(mp4|webm|mov|m4v|ogv|ogg)(\?|#|$)/i.test(url || '') }

function LazyVideo({ src, className, ...props }: React.VideoHTMLAttributes<HTMLVideoElement> & { src: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: '100%' }}>
      {visible ? (
        <video src={src} className="w-full h-full object-cover" {...props} />
      ) : (
        <div className="w-full h-full bg-gray-800" />
      )}
    </div>
  )
}

function Lightbox({ url, title, category, onClose }: { url: string; title: string; category: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl hover:scale-110 transition-transform z-10">&times;</button>
      <div onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[90vh] relative">
        <img src={url} alt={title} className="max-w-full max-h-[85vh] rounded-lg" />
        <div className="text-center mt-4">
          <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold rounded-full mb-2">{category}</span>
          <h4 className="text-white text-xl font-bold">{title}</h4>
        </div>
      </div>
    </div>
  )
}

export default function Gallery({ projects }: { projects: Project[] }) {
  const [lightbox, setLightbox] = useState<{ url: string; title: string; category: string } | null>(null)
  const imgScrollRef = useRef<HTMLDivElement>(null)
  const vidScrollRef = useRef<HTMLDivElement>(null)
  const [imgPaused, setImgPaused] = useState(false)
  const [vidPaused, setVidPaused] = useState(false)

  const imageProjects = projects.filter(p => !isVideo(p.image_url))
  const videoProjects = projects.filter(p => isVideo(p.image_url))

  const scroll = useCallback((ref: React.RefObject<HTMLDivElement | null>, dir: number) => {
    ref.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }, [])

  const GalleryControls = ({ paused, setPaused, scrollRef }: { paused: boolean; setPaused: (v: boolean) => void; scrollRef: React.RefObject<HTMLDivElement | null> }) => (
    <div className="flex justify-center items-center gap-4 mb-8">
      <button onClick={() => scroll(scrollRef, -1)} className="gallery-control-btn"><i className="fas fa-chevron-left text-sm" /></button>
      <div className="flex gap-2 mx-2">
        <button onClick={() => setPaused(false)} className={`gallery-control-btn ${!paused ? 'active' : ''}`}><i className="fas fa-play text-sm" /></button>
        <button onClick={() => setPaused(true)} className={`gallery-control-btn ${paused ? 'active' : ''}`}><i className="fas fa-pause text-sm" /></button>
      </div>
      <button onClick={() => scroll(scrollRef, 1)} className="gallery-control-btn"><i className="fas fa-chevron-right text-sm" /></button>
    </div>
  )

  return (
    <section id="galleria" className="py-24 bg-gray-50">
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-2">I Nostri Lavori</h2>
          <h3 className="font-display text-4xl font-bold text-gray-900">Galleria Progetti</h3>
          <div className="w-24 h-1 bg-brand mx-auto mt-6 rounded-full" />
        </div>

        <GalleryControls paused={imgPaused} setPaused={setImgPaused} scrollRef={imgScrollRef} />

        <div ref={imgScrollRef} className="relative w-full overflow-x-auto mt-10 pb-10 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className={`flex w-max ${imgPaused ? 'animate-scroll paused' : 'animate-scroll'}`}>
            {[0, 1].map(set => (
              <div key={set} className="flex gap-6 px-3">
                {imageProjects.map(p => (
                  <div key={`${set}-${p.id}`} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer w-72 md:w-96 h-64 md:h-80 flex-shrink-0"
                    onClick={() => setLightbox({ url: p.image_url, title: p.title, category: p.category })}>
                    <img src={p.image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold rounded-full mb-2 shadow-md">{p.category}</span>
                        <h4 className="text-white text-xl font-bold font-display">{p.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {videoProjects.length > 0 && (
          <>
            <div className="text-center max-w-3xl mx-auto mt-8 mb-4">
              <h3 className="font-display text-3xl font-bold text-gray-900">Galleria Video</h3>
              <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full" />
            </div>
            <GalleryControls paused={vidPaused} setPaused={setVidPaused} scrollRef={vidScrollRef} />
            <div ref={vidScrollRef} className="relative w-full overflow-x-auto mt-8 pb-10 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className={`flex w-max ${vidPaused ? 'animate-scroll-videos paused' : 'animate-scroll-videos'}`}>
                {[0, 1].map(set => (
                  <div key={set} className="flex gap-6 px-3">
                    {videoProjects.map(p => (
                      <div key={`${set}-${p.id}`} className="group relative overflow-hidden rounded-2xl shadow-lg w-72 md:w-96 h-64 md:h-80 flex-shrink-0 bg-black">
                        <LazyVideo src={`${p.image_url}#t=0.001`} className="w-full h-full object-cover" playsInline preload="metadata" controls />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                          <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold rounded-full mb-2 shadow-md">{p.category}</span>
                          <h4 className="text-white text-xl font-bold font-display">{p.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {videoProjects.length === 0 && (
          <div className="text-center text-gray-500 font-medium mt-4">Nessun video disponibile al momento.</div>
        )}
      </div>
    </section>
  )
}
