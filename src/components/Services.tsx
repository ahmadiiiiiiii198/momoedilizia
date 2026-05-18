import Image from 'next/image'
import { Service, SiteConfig } from '@/lib/supabase'

export default function Services({ services, config }: { services: Service[]; config: SiteConfig[] }) {
  const get = (key: string) => config.find(c => c.key === key)?.value
  const subtitle = get('services_subtitle') || 'Cosa Facciamo'
  const title = get('services_title') || 'I Nostri Servizi'
  const heading = get('services_heading') || 'Edilizia Generale'
  const description = get('services_description') || 'Forniamo servizi di alta qualità a prezzi competitivi e costruiamo il tuo futuro con massima qualità e professionalità.'

  const cols = services.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section id="servizi" className="py-28 bg-gray-50 relative overflow-x-clip section-dot-pattern">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/8 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full bg-brand/6 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-2">{subtitle}</h2>
          <h3 className="font-display text-4xl font-bold text-gray-900">{title}</h3>
          <h4 className="font-display text-2xl font-medium text-gray-600 mt-3">{heading}</h4>
          <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-10 rounded-full" />

          <div className="glass p-8 md:p-10 rounded-3xl shadow-xl border border-white/80 relative overflow-hidden text-center transform transition duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-brand/10 blur-2xl" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-brand-light/10 blur-2xl" />
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium relative z-10 lg:px-6"
              dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
          {services.map((s, i) => {
            const hasImg = !!s.image_url?.trim()
            return (
              <div key={s.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-brand/30 group hover:-translate-y-2 overflow-hidden">
                {hasImg ? (
                  <div className="relative h-52 overflow-hidden">
                    <Image src={s.image_url!} alt={s.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 300px" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-11 h-11 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <i className={`${s.icon} text-lg text-brand`} />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-brand/10 group-hover:bg-brand transition-colors duration-300">
                      <i className={`${s.icon} text-xl text-brand group-hover:text-white transition-colors duration-300`} />
                    </div>
                  </div>
                )}
                <div className={`p-6 ${hasImg ? '' : 'pt-0'}`}>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 font-display group-hover:text-brand transition-colors duration-300">{s.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">{s.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
