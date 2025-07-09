import type { Block } from 'payload'


export const FeatureBlock: Block = {
  slug: 'featureImages',
  interfaceName: 'FeatureBlock',
  fields: [
    {
      name: 'features',
      type: 'array',
      label: 'Features Images',
      fields: [
        {
          name: "feature",
          type: 'upload',
          relationTo: 'media',
          label: 'Feature Image',
        },
      ],
    },
  ],
}
