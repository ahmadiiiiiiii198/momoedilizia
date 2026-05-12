const sedi = [
  { name: 'Moncalieri', address: 'Corso Roma 87', city: 'Moncalieri (TO)', mapQuery: 'Corso+Roma+87+Moncalieri+TO' },
  { name: 'Collegno', address: 'Via Alessandro Manzoni 7', city: 'Collegno (TO)', mapQuery: 'Via+Alessandro+Manzoni+7+Collegno+TO' },
  { name: 'Torino', address: 'Via Baretti 2', city: 'Torino (TO)', mapQuery: 'Via+Baretti+2+Torino' },
]

export default function Locations() {
  return (
    <section id="sedi" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-3">Dove Siamo</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-gray-900">Le Nostre Sedi</h3>
          <p className="text-gray-500 mt-4 text-lg">Tre sedi strategiche in provincia di Torino per essere sempre vicini ai nostri clienti.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sedi.map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand/30 overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-brand/10 group-hover:bg-brand transition-colors duration-300 mx-auto">
                  <i className="fas fa-map-marker-alt text-xl text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 font-display">{s.name}</h4>
                <p className="text-gray-500 text-sm">{s.address}</p>
                <p className="text-gray-400 text-sm">{s.city}</p>
                <a href={`https://maps.google.com/?q=${s.mapQuery}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-brand text-sm font-semibold hover:underline">
                  <i className="fas fa-directions text-xs" /> Indicazioni stradali
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
