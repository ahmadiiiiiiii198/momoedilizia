'use client'
import { useState } from 'react'
import { supabase, SiteConfig } from '@/lib/supabase'

export default function Contact({ config }: { config: SiteConfig[] }) {
  const [submitting, setSubmitting] = useState(false)
  const get = (key: string) => config.find(c => c.key === key)?.value || ''

  const phone = get('contact_phone')
  const email = get('contact_email') || 'info@gruppomomoedilizia.it'
  const pec = get('contact_pec') || 'elsaifyservizi@pec.it'

  const phones = phone ? phone.split(/[/|]/).filter(Boolean).map(p => p.trim()) : ['+39 324.60.82.115', '+39 353.36.37.302', '+39 392.74.91.642']

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = fd.get('name') as string
    const userEmail = fd.get('email') as string
    const message = fd.get('message') as string
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name, email: userEmail, message
      }])
      if (error) throw error
      alert('Messaggio inviato con successo! Ti contatteremo al piu presto.')
      form.reset()
    } catch {
      alert('Si e verificato un errore. Riprova piu tardi.')
    } finally { setSubmitting(false) }

    try {
      await supabase.functions.invoke('send-contact-email', {
        body: { name, email: userEmail, message }
      })
    } catch {}
  }

  return (
    <section id="contatti" className="py-28 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand/8 via-transparent to-transparent" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wider uppercase text-sm mb-3">Contatti</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Pronti a iniziare?</h3>
          <p className="text-gray-400 mt-4 text-lg">Contattaci per un sopralluogo gratuito o per richiedere un preventivo senza impegno.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand to-brand-light mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-brand" />
                </div>
                <h4 className="font-bold">Le Nostre Sedi</h4>
              </div>
              <div className="text-gray-400 space-y-1 text-sm ml-14">
                <p><span className="text-gray-200">Moncalieri:</span> Corso Roma 87</p>
                <p><span className="text-gray-200">Collegno:</span> Via A. Manzoni 7</p>
                <p><span className="text-gray-200">Torino:</span> Via Baretti 2</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone-alt text-brand" />
                </div>
                <h4 className="font-bold">Telefono</h4>
              </div>
              <div className="ml-14 flex flex-col gap-2">
                {phones.map((p, i) => {
                  const clean = p.replace(/\D/g, '')
                  const tel = clean.startsWith('39') ? `+${clean}` : `+39${clean}`
                  return (
                    <a key={i} href={`tel:${tel}`} className="text-brand text-sm font-medium hover:text-brand-light transition-colors flex items-center gap-2">
                      <i className="fas fa-phone-alt text-[10px]" /> {p}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center mb-3">
                  <i className="fas fa-envelope text-brand" />
                </div>
                <h4 className="font-bold text-sm mb-1">Email</h4>
                <p className="text-gray-400 text-xs break-all">{email}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center mb-3">
                  <i className="fas fa-envelope-open-text text-brand" />
                </div>
                <h4 className="font-bold text-sm mb-1">PEC</h4>
                <p className="text-gray-400 text-xs break-all">{pec}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/30">
              <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">Invia un messaggio</h4>
              <p className="text-gray-500 text-sm mb-8">Compila il modulo e ti risponderemo entro 24 ore.</p>
              <form onSubmit={submitForm} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Nome</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-gray-900 text-sm" placeholder="Mario Rossi" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-gray-900 text-sm" placeholder="mario.rossi@email.it" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Messaggio</label>
                  <textarea name="message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-gray-900 resize-none text-sm" placeholder="Descrivi brevemente il tuo progetto..." />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand/20 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <><i className="fas fa-spinner fa-spin" /> Invio in corso...</> : <><i className="fas fa-paper-plane text-sm" /> Invia Richiesta</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
