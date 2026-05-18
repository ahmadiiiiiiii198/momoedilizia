import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Carpenteria from '@/components/Carpenteria'
import Services from '@/components/Services'
import About from '@/components/About'
import Process from '@/components/Process'
import Gallery from '@/components/Gallery'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import Locations from '@/components/Locations'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import LazySection from '@/components/LazySection'

export const dynamic = 'force-static'

async function getData() {
  const [confRes, aboutRes, servRes, projRes, baRes] = await Promise.all([
    supabase.from('site_config').select('*'),
    supabase.from('about_images').select('*').order('id'),
    supabase.from('services').select('*').order('id'),
    supabase.from('projects').select('*').order('id'),
    supabase.from('before_after').select('*').order('created_at', { ascending: false }),
  ])

  return {
    config: confRes.data || [],
    aboutImages: aboutRes.data || [],
    services: servRes.data || [],
    projects: projRes.data || [],
    beforeAfter: baRes.data || [],
  }
}

export default async function Home() {
  const { config, aboutImages, services, projects, beforeAfter } = await getData()

  return (
    <>
      <Navbar />
      <main>
        <Hero config={config} />
        <LazySection>
          <Carpenteria />
        </LazySection>
        <LazySection>
          <Services services={services} config={config} />
        </LazySection>
        <LazySection>
          <About aboutImages={aboutImages} config={config} />
        </LazySection>
        <LazySection>
          <Process />
        </LazySection>
        <LazySection>
          <Gallery projects={projects} />
        </LazySection>
        <LazySection>
          <BeforeAfter items={beforeAfter} />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
        <LazySection>
          <Locations />
        </LazySection>
        <LazySection>
          <Contact config={config} />
        </LazySection>
      </main>
      <Footer config={config} />
      <FloatingButtons config={config} />
    </>
  )
}
