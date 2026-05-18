import Image from 'next/image'

const images = [
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=75', alt: 'Operaio edile al lavoro', h: 'h-44 sm:h-52' },
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=75', alt: 'Cantiere edile con gru', h: 'h-32 sm:h-40' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=75', alt: 'Struttura in costruzione', h: 'h-32 sm:h-40' },
  { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&auto=format&fit=crop&q=75', alt: 'Team edile al lavoro', h: 'h-44 sm:h-52' },
]

const certs = [
  { icon: 'fas fa-award', name: 'ISO 9001', desc: 'Gestione Qualità' },
  { icon: 'fas fa-shield-alt', name: 'SOA', desc: 'Lavori Pubblici' },
  { icon: 'fas fa-file-contract', name: 'DURC', desc: 'Regolarità Contributiva' },
  { icon: 'fas fa-hard-hat', name: 'D.Lgs 81/08', desc: 'Sicurezza Cantieri' },
  { icon: 'fas fa-leaf', name: 'CAM', desc: 'Edilizia Sostenibile' },
  { icon: 'fas fa-building', name: 'CCIAA', desc: 'Camera di Commercio' },
]

export default function Carpenteria() {
  return (
    <section id="carpenteria" className="py-28 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 relative overflow-hidden">
      <div className="absolute top-10 -left-24 w-72 h-72 rounded-full bg-brand/5 blur-3xl" />
      <div className="absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-brand/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand" />
              <h2 className="text-brand font-semibold tracking-wider uppercase text-sm">Carpenteria &amp; Strutture</h2>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Lavori di carpenteria <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-light">a regola d&apos;arte</span>
            </h3>
            <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
              Realizziamo strutture in legno e acciaio, tetti, solai e opere di carpenteria con precisione artigianale e materiali certificati. Ogni intervento è progettato per durare nel tempo e rispettare le normative vigenti.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                {images.slice(0, 2).map((img, i) => (
                  <div key={i} className={`relative ${img.h} rounded-2xl shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-2xl duration-300`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="300px" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="space-y-3 sm:space-y-4 mt-6">
                {images.slice(2).map((img, i) => (
                  <div key={i} className={`relative ${img.h} rounded-2xl shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-2xl duration-300`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="300px" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-brand" />
              <h2 className="text-brand font-semibold tracking-wider uppercase text-sm">Qualità Certificata</h2>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Le nostre <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-light">certificazioni</span>
            </h3>
            <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
              Operiamo nel pieno rispetto delle normative italiane ed europee, con personale qualificato e materiali tracciabili. Le nostre certificazioni garantiscono affidabilità, sicurezza e trasparenza in ogni cantiere.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {certs.map((c, i) => (
                <div key={i} className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-brand rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-brand/10 group-hover:bg-brand text-brand group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300">
                    <i className={`${c.icon} text-xl`} />
                  </div>
                  <h5 className="font-display font-bold text-gray-900 text-sm sm:text-base">{c.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
