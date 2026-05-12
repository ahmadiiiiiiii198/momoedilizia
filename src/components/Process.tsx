const steps = [
  { num: '01', icon: 'fas fa-search-location', title: 'Sopralluogo', desc: 'Analisi gratuita sul posto per capire le tue esigenze e le specifiche del cantiere.' },
  { num: '02', icon: 'fas fa-file-invoice-dollar', title: 'Preventivo', desc: 'Proposta dettagliata e trasparente, senza costi nascosti e con tempistiche certe.' },
  { num: '03', icon: 'fas fa-hard-hat', title: 'Esecuzione', desc: "Lavorazione a regola d'arte con personale qualificato e rispetto delle norme." },
  { num: '04', icon: 'fas fa-key', title: 'Consegna', desc: 'Collaudo finale e consegna chiavi in mano con garanzia sui lavori eseguiti.' },
]

export default function Process() {
  return (
    <section id="metodo" className="py-28 bg-gray-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-3">Come Lavoriamo</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Il Nostro Metodo</h3>
          <p className="text-gray-400 mt-4 text-lg">Quattro fasi precise per garantire risultati eccellenti.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto mt-6 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-[3.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent z-0" />
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 group">
              <div className="text-center mb-6">
                <div className="w-[72px] h-[72px] mx-auto bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center group-hover:border-brand group-hover:bg-brand/10 transition-all duration-500 shadow-xl">
                  <i className={`${s.icon} text-2xl text-brand`} />
                </div>
                <span className="inline-block mt-3 text-[11px] font-bold text-brand/60 tracking-[0.3em] uppercase">Step {s.num}</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-brand/30 transition-all duration-500">
                <h4 className="text-lg font-bold mb-2 font-display">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
