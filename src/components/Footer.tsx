import { SiteConfig } from '@/lib/supabase'

export default function Footer({ config }: { config: SiteConfig[] }) {
  const get = (key: string) => config.find(c => c.key === key)?.value || ''
  const pec = get('contact_pec') || 'elsaifyservizi@pec.it'
  const piva = get('contact_piva')
  const facebook = get('social_facebook')
  const instagram = get('social_instagram')
  const linkedin = get('social_linkedin')

  return (
    <footer className="bg-gray-950 text-gray-500 relative">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="font-display font-bold flex flex-col leading-none">
              <span className="text-gray-300 text-sm tracking-[0.15em]">GRUPPO</span>
              <span className="text-brand text-xs tracking-wider uppercase">Momo Edilizia</span>
            </div>
          </div>
          <div className="text-center text-xs space-y-1">
            <p>&copy; Gruppo Momo Edilizia. Tutti i diritti riservati.</p>
            <p className="text-gray-600">PEC: {pec} {piva ? `| P.IVA: ${piva}` : ''}</p>
          </div>
          <div className="flex items-center gap-4">
            {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand hover:border-brand transition-all duration-300"><i className="fab fa-facebook-f text-sm" /></a>}
            {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand hover:border-brand transition-all duration-300"><i className="fab fa-instagram text-sm" /></a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand hover:border-brand transition-all duration-300"><i className="fab fa-linkedin-in text-sm" /></a>}
            <a href="#home" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand hover:border-brand transition-all duration-300"><i className="fas fa-arrow-up text-sm" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
