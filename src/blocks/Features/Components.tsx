'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { FeatureBlock } from '@/payload-types'
import { Media } from '@/components/Media'

export const FeatureComp: React.FC<FeatureBlock> = ({ features }) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Reference for the model group

  return (
    <div
      className="relative flex items-center justify-center text-white flex-col"
      data-theme="light"
    >
      <div className=" mb-8 z-10 relative flex items-center justify-center">
        <div className="w-full md:text-center flex flex-row items-center justify-between gap-12 flex-wrap px-8">
          {Array.isArray(features) &&
            features.length > 0 &&
            features.map(({ feature }, i) => (
              <div className="select-none w-[100px]" key={i}>
                {feature && typeof feature === 'object' && (
                  <Media imgClassName="-z-10 object-cover" priority resource={feature} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
