import { Block } from "payload";
import type { Gap } from '@/payload-types'

export const GapBlock: Block = {
  slug: 'gap',
  interfaceName: 'Gap',
  fields: [
        {
            name: 'gapSize',
            type: 'number',
            label: 'Gap Size',
            required: true,
            min: 0,
            admin: {
                step: 1,
            },
        }

        ,
        {
            name: 'unit',
            type: 'select',
            label: 'Unit',
            required: true,
            options: [
                { label: 'px', value: 'px' },
                { label: '%', value: '%' },
            ],
            defaultValue: 'px',
        }

      ]
}

export const GapComp: React.FC<Gap> = ({ gapSize, unit }) => {

  return (
    <div
      className="relative w-full"
      style={{ height: `${gapSize}${unit}` }}
    />
  )
}

