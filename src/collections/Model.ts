import { CollectionConfig } from 'payload';

const Models: CollectionConfig = {
  slug: '3d-models',
  upload: {
    staticDir: 'media',
    // mimeTypes: ['model/gltf-binary'],  // Add other 3D model formats if needed
  },
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

export default Models;