'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

import type { Navigation } from '@/payload-types'
import { Media } from '@/components/Media'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Navigation
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className={cn(
        'container z-50 sticky top-0 transition-colors duration-300',
        'bg-transparent',
        '[&.is-sticky]:bg-white/100',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
      onScrollCapture={(e) => {
        // No-op: just to ensure React doesn't warn about unknown prop
      }}
      ref={(el) => {
        if (!el) return
        let lastScrollY = window.scrollY
        const onScroll = () => {
          if (window.scrollY > 0) {
            el.classList.add('is-sticky')
          } else {
            el.classList.remove('is-sticky')
          }
          lastScrollY = window.scrollY
        }
        window.addEventListener('scroll', onScroll)
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
      }}
    >
      <div className="py-2 flex justify-between items-center gap-4">
        <div className="flex justify-start items-center gap-4">
          <Link href="/">
            <Media resource={data.asusLogo} />
          </Link>
          <Link href={data.rogLink}>
            <Media resource={data.rogLogo} />
          </Link>
          <Link href={data.tufLink}>
            <Media resource={data.tufLogo} />
          </Link>
          <HeaderNav data={data} />
        </div>
        <Link href={data.poweredByURL}>
          Powered by <strong>{data.poweredByText}</strong>
        </Link>
      </div>
    </header>
  )
}
