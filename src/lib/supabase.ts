import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://msqdvvetjyrnnvaqmqwr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWR2dmV0anlybm52YXFtcXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTQ0MjgsImV4cCI6MjA5MDU3MDQyOH0.Qy8A6OkwS_f6LPXIH76kJ12A4l-NNys_cSz_qXaOL4s'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type SiteConfig = { id: number; key: string; value: string }
export type Service = { id: number; icon: string; title: string; description: string; image_url?: string }
export type Project = { id: number; image_url: string; category: string; title: string }
export type BeforeAfter = { id: number; title: string; category: string; before_url: string; after_url: string; created_at: string }
export type AboutImage = { id: number; image_url: string; alt_text: string; caption: string }
export type Review = { id: number; name: string; email?: string; rating: number; content: string; is_approved: boolean; created_at: string }
