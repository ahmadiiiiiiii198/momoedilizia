import Image from 'next/image'
import { AboutImage, SiteConfig } from '@/lib/supabase'

const defaultImages = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=75', alt: 'Operaio edile al lavoro' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&auto=format&fit=crop&q=75', alt: 'Cantiere edile con gru' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&auto=format&fit=crop&q=75', alt: 'Progetto edile' },
  { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&auto=format&fit=crop&q=75', alt: 'Team edile al lavoro' },
]

const values = [
  { icon: 'fas fa-check', title: 'Qualità Garantita', desc: 'Utilizziamo solo i migliori materiali per risultati duraturi nel tempo.' },
  { icon: 'fas fa-clock', title: 'Rispetto dei Tempi', desc: 'Pianificazione accurata per consegnare il progetto nei tempi stabiliti.' },
  { icon: 'fas fa-hard-hat', title: 'Sicurezza al Primo Posto', desc: 'Rigidi protocolli per garantire cantieri sicuri e a norma di legge.' },
]

export default function About({ aboutImages, config }: { aboutImages: AboutImage[]; config: SiteConfig[] }) {
  const get = (key: string) => config.find(c => c.key === key)?.value
  const text1 = get('about_text1') || "Siamo un'impresa edile dinamica, nata con l'obiettivo di portare innovazione e qualità superiore in ogni cantiere. Il nostro team è composto da professionisti altamente qualificati con una profonda conoscenza del settore."
  const text2 = get('about_text2') || "Crediamo fortemente che ogni progetto sia unico. Per questo lavoriamo a stretto contatto con i nostri clienti, garantendo totale trasparenza, rigoroso rispetto delle normative di sicurezza e l'utilizzo di materiali certificati e all'avanguardia."

  const imgs = aboutImages.length > 0
    ? aboutImages.map(a => ({ src: a.image_url, alt: a.alt_text }))
    : defaultImages

  return (
    <section id="chi-siamo" className="py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-x-clip">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 w-full relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                {imgs.slice(0, 2).map((img, i) => (
                  <div key={i} className={`relative ${i === 0 ? 'h-64' : 'h-48'} rounded-2xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl duration-300`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="350px" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {imgs.slice(2, 4).map((img, i) => (
                  <div key={i} className={`relative ${i === 0 ? 'h-48' : 'h-64'} rounded-2xl shadow-xl overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl duration-300`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="350px" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl border-4 border-white text-center w-48">
              <h4 className="text-4xl font-display font-bold text-brand mb-1">10+</h4>
              <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Anni di Esperienza</p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand" />
              <h2 className="text-brand font-semibold tracking-wider uppercase text-sm">Chi Siamo</h2>
            </div>
            <h3 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Costruiamo basi solide per i <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-light">tuoi progetti</span>
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: text1 }} />
            <p className="text-gray-600 mb-10 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: text2 }} />

            <div className="space-y-4 mb-10">
              {values.map((v, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center mt-1">
                    <i className={`${v.icon} text-brand text-sm`} />
                  </div>
                  <div className="ml-4">
                    <h5 className="text-gray-900 font-bold text-lg">{v.title}</h5>
                    <p className="text-gray-600 mt-1">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
