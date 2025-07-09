import { Block } from 'payload';

const SuzumeSceneBlock: Block = {
  slug: 'suzume-scene',
  interfaceName: 'SuzumeScene',
  labels: {
    singular: 'Suzume Scene',
    plural: 'Suzume Scenes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
  ],
};

export default SuzumeSceneBlock;
