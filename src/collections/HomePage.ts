import { GlobalConfig } from 'payload';

const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
    // Hero Section
    {
      name: 'heroBackdropImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'rogAllyHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'asusEshopLink',
      type: 'text', // URL
      required: true,
    },
    {
      name: 'bestBuyLink',
      type: 'text', // URL
      required: true,
    },
    // Reference to Features
    {
      name: 'featuresSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'Features',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'relationship',
          relationTo: 'features',
        },
      ],
      minRows: 6,
      maxRows: 6,
    },
    // Reference to Product Details Sections
    {
      name: 'productDetailSections',
      type: 'array',
      fields: [
        {
          name: 'section',
          type: 'relationship',
          relationTo: 'product-details',
        },
      ],
      minRows: 3,
      maxRows: 3,
    },
  ],
};

export default HomePage;