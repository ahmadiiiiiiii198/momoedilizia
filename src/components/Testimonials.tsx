'use client'
import { useState, useEffect } from 'react'
import { supabase, Review } from '@/lib/supabase'

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    supabase.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setReviews(data); setLoading(false) })
  }, [])

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    try {
      const { error } = await supabase.from('reviews').insert([{
        name: fd.get('name'), email: fd.get('email'), rating, content: fd.get('content')
      }])
      if (error) throw error
      alert("Grazie! La tua recensione è stata inviata e sarà visibile dopo l'approvazione.")
      form.reset()
      setRating(5)
    } catch (err: any) {
      alert("Errore durante l'invio: " + err.message)
    } finally { setSubmitting(false) }
  }

  return (
    <section className="py-28 bg-gradient-to-br from-brand-dark via-brand to-brand-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-white/80 font-semibold tracking-wider uppercase text-sm mb-2">Dicono di Noi</h2>
          <h3 className="font-display text-4xl font-bold text-white">Cosa pensano i nostri clienti</h3>
          <div className="w-24 h-1 bg-white/40 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center text-white/70 italic">Caricamento recensioni...</div>
          ) : reviews.length > 0 ? reviews.map((rev, i) => (
            <div key={rev.id} className="bg-white p-7 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-500 relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-brand-light rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <i className="fas fa-quote-left absolute text-6xl text-brand/5 top-4 right-5" />
              <div className="flex text-yellow-400 mb-4 text-sm gap-0.5">
                {[...Array(5)].map((_, j) => <i key={j} className={`${j < rev.rating ? 'fas' : 'far'} fa-star`} />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{rev.content}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {rev.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1"><i className="fas fa-check-circle text-green-500" /> Verificata</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center text-white/70 italic">Sii il primo a lasciare una recensione!</div>
          )}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h4 className="text-white text-2xl font-bold text-center mb-8 font-display">Lascia la tua recensione</h4>
          <form onSubmit={submitReview} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1">Nome *</label>
                <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="Il tuo nome" />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1">Email (opzionale)</label>
                <input type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="email@esempio.it" />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1">Valutazione *</label>
              <div className="flex gap-2 text-2xl text-yellow-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map(v => (
                  <i key={v} onClick={() => setRating(v)} className={`${v <= rating ? 'fas' : 'far'} fa-star`} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1">La tua recensione *</label>
              <textarea name="content" required rows={4} className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none" placeholder="Racconta la tua esperienza..." />
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-white text-brand font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg disabled:opacity-50">
              {submitting ? 'Invio...' : 'Invia Recensione'}
            </button>
            <p className="text-white/60 text-[10px] text-center mt-2 italic">La recensione verrà pubblicata dopo l&apos;approvazione dello staff.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
