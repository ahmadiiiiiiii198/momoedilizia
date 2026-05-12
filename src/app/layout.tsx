import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['700', '800'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Gruppo Momo Edilizia | Impresa Edile a Torino, Moncalieri e Collegno',
  description: 'Gruppo Momo Edilizia: impresa edile specializzata in ristrutturazioni, nuove costruzioni e manutenzione a Torino, Moncalieri e Collegno. Preventivo gratuito, qualità garantita e materiali certificati.',
  keywords: 'impresa edile Torino, ristrutturazioni Torino, edilizia Moncalieri, costruzioni Collegno',
  authors: [{ name: 'Gruppo Momo Edilizia' }],
  icons: { icon: '/icon.png', apple: '/icon.png' },
  openGraph: {
    type: 'website',
    url: 'https://gruppo-momo-edilizia.it',
    title: 'Gruppo Momo Edilizia | Impresa Edile a Torino, Moncalieri e Collegno',
    description: 'Ristrutturazioni, nuove costruzioni e manutenzione edile di alta qualità. Preventivo gratuito, materiali certificati e personale qualificato.',
    images: [{ url: 'https://gruppo-momo-edilizia.it/icon.png', alt: 'Logo Gruppo Momo Edilizia' }],
    locale: 'it_IT',
    siteName: 'Gruppo Momo Edilizia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="font-sans text-gray-800 antialiased bg-gradient-to-b from-white via-white to-gray-50">
        {children}
      </body>
    </html>
  )
}
