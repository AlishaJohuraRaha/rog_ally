import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export async function Footer() {
  const { richText, media }: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="mt-auto  bg-[#1B1F23] dark:bg-card text-white">
      <div className="container py-10 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="w-full md:text-center">
          {richText && (
            <RichText className="mb-0 text-gray-500 " data={richText} enableGutter={false} />
          )}
          {Array.isArray(media) && media.length > 0 && (
            <ul className="flex md:justify-center gap-4 mt-10">
              {media.map(({ image, altText, link, id }, i) => (
                <Link key={id || i} href={link || '#'} className="flex items-center justify-center">
                  <Media
                    key={id ?? i}
                    resource={image}
                    alt={altText}
                  />
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
