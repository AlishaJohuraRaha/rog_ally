import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Navigation } from '@/payload-types'

export async function Header() {
  const headerData: Navigation = await getCachedGlobal('navigation', 1)()

  return <HeaderClient data={headerData} />
}
