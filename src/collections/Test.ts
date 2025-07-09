import { CollectionConfig } from 'payload';

const Test: CollectionConfig = {
  slug: 'testdata',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    // You might add fields for PBR material settings if you want to control them from Payload
    // For simplicity, we'll assume the GLB/GLTF contains good materials.
  ],
};

export default Test;