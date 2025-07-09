import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { GapBlock } from '@/blocks/Gap'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({ blocks: [GapBlock] }),
            UploadFeature({
              collections: {
                uploads: {
                  // Example showing how to customize the built-in fields
                  // of the Upload feature
                  fields: [
                    {
                      name: 'caption',
                      type: 'richText',
                      editor: lexicalEditor(),
                    },
                  ],
                },
              },
            }),
            AlignFeature(),
          ]
        },
      }),
      label: false,
    },
    // make an array of media fields
    {
      name: 'media',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altText',
          type: 'text',
          required: true,
        },
        // add a link field
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
