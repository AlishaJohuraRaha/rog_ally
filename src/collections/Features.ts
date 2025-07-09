
import { CollectionConfig } from 'payload';

const Features: CollectionConfig = {
  slug: 'features',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection for uploads
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      unique: true,
      min: 1,
      max: 6, // Enforce only 6 features
    },
  ],
};

export default Features;