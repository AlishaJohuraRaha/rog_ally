import { Block } from 'payload';

const BoxSceneBlock: Block = {
  slug: 'box-scene',
  interfaceName: 'BoxScene',
  labels: {
    singular: 'Box Scene',
    plural: 'Box Scenes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
  ],
};

export default BoxSceneBlock;
