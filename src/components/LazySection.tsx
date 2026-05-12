'use client'
import { useRef, useState, useEffect, ReactNode } from 'react'

export default function LazySection({ children, className = '', threshold = 0.05, rootMargin = '200px 0px' }: {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <div className="animate-fade-in-up">{children}</div>
      ) : (
        <div className="min-h-[200px]" />
      )}
    </div>
  )
}
