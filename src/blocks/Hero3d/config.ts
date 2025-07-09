import type { Block } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { GapBlock } from '../Gap'

export const Hero3DBlock: Block = {
  slug: 'hero3d', 
  interfaceName: 'Hero3D',
  fields: [
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
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
    },
    {
      name: 'whiteGradient',
      type: 'upload',
      relationTo: 'media',
      label: 'White Gradient Image',
      required: false,
    },
    {
      name: 'shadow',
      type: 'upload',
      relationTo: 'media',
      label: 'Console Shadowe',
      required: false,
    },
  ],
}
