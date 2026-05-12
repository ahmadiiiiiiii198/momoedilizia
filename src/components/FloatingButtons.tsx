import { SiteConfig } from '@/lib/supabase'

export default function FloatingButtons({ config }: { config: SiteConfig[] }) {
  const phone = config.find(c => c.key === 'contact_phone')?.value || ''
  const cleanPhone = phone.split(/[/|]/)[0]?.trim().replace(/\D/g, '') || '393246082115'
  const whatsappPhone = cleanPhone.startsWith('39') ? cleanPhone : `39${cleanPhone}`

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[100]">
      <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noopener noreferrer"
        className="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group relative pulse-btn">
        <i className="fab fa-whatsapp text-3xl" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chatta con noi</span>
      </a>
      <a href="#contatti"
        className="bg-brand text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group relative pulse-btn"
        style={{ animationDelay: '1s' }}>
        <i className="fas fa-paper-plane text-xl" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Invia Richiesta</span>
      </a>
    </div>
  )
}
