import { Block } from 'payload'

export const ScrollDetailBlock: Block = {
  slug: 'scrollDetail',
  interfaceName: 'ScrollDetail',
  fields: [
    {
      name: 'heading1',
      type: 'text',
      label: 'Heading #1',
      required: true,
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      label: 'Paragraph #1',
      required: true,
    },
    {
      name: 'heading2',
      type: 'text',
      label: 'Heading #2',
      required: true,
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      label: 'Paragraph #2',
      required: true,
    },
    {
      name: 'heading3',
      type: 'text',
      label: 'Heading #3',
      required: true,
    },
     {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
    },
  ],
}
