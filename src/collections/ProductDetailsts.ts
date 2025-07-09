import { CollectionConfig } from 'payload';

const ProductDetails: CollectionConfig = {
  slug: 'product-details',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'bodyText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'modelPosition', // 'right', 'left', 'middle' - for GSAP control
      type: 'select',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
        { label: 'Middle', value: 'middle' },
      ],
      required: true,
    },
    {
      name: 'modelLabels', // For the 'model in the middle' section
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'positionX', // Relative position on the model (e.g., -0.5 to 0.5)
          type: 'number',
          min: -1,
          max: 1,
        },
        {
          name: 'positionY',
          type: 'number',
          min: -1,
          max: 1,
        },
        {
          name: 'positionZ',
          type: 'number',
          min: -1,
          max: 1,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.modelPosition === 'middle',
      },
    },
  ],
};

export default ProductDetails;