'use client'

import React from 'react'

import type { Navigation } from '@/payload-types'

import Link from 'next/link'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export const HeaderNav: React.FC<{ data: Navigation }> = ({ data }) => {
  const navLinks = data?.navLinks || []

  return (
    // <nav className="flex gap-3 items-center">
    //   {navLinks.map(( {label}, i) => {
    //     return <CMSLink key={i} label={label} url ={'/'} appearance="link" />
    //   })}
    //   {/* <Link href="/search">
    //     <span className="sr-only">Search</span>
    //     <SearchIcon className="w-5 text-primary" />
    //   </Link> */}
    // </nav>

    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((navLink, i) => (
          <NavigationMenuItem className="relative" key={i}>
            <NavigationMenuTrigger>{navLink.label}</NavigationMenuTrigger>
            {navLink.subLinks && navLink.subLinks.length > 0 && (
              <NavigationMenuContent className="absolute mt-12 rounded-xl bg-white shadow-lg p-4 min-w-[220px]">
                <ul className="grid gap-2">
                  {navLink.subLinks.map((subLink, j) => (
                    <li key={j}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={subLink.url || '#'}
                          className="block px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-800"
                        >
                          {subLink.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
