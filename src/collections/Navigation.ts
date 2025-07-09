import { revalidateHeader } from '@/Header/hooks/revalidateHeader';
import { fields } from './../blocks/Form/fields';
import { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
  slug: 'navigation',
    access: {
      read: () => true,
    },
      hooks: {
      afterChange: [revalidateHeader],
    },
  fields: [
    {
      name: 'asusLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'rogLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
        name: 'rogLink',
        type: 'text',
        required: true,
        defaultValue: 'https://rog.asus.com/',
    },
    {
      name: 'tufLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
        name: 'tufLink',
        type: 'text',
        required: true,
        defaultValue: 'https://tuf.asus.com/',
    },
    {
        name: 'twitterLogo',
        type: 'upload',
        relationTo: 'media',
        required: true,
    },
    {
        name: 'twitterLink',
        type: 'text',
        required: true,
        defaultValue: 'https://twitter.com/ASUS_ROG',
    },
    {
      name: 'navSearch',
      type: 'checkbox',
      defaultValue: true,
    },
    //facebook logo and link
    {
      name: 'facebookLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'facebookLink',
      type: 'text',
      required: true,
      defaultValue: 'https://www.facebook.com/ASUSROG/',
    },
    //instagram logo and link
    {
      name: 'instagramLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'instagramLink',
      type: 'text',
      required: true,
      defaultValue: 'https://www.instagram.com/asusrog/',
    },
    // youtube logo and link
    {
      name: 'youtubeLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'youtubeLink',
      type: 'text',
      required: true,
      defaultValue: 'https://www.youtube.com/user/ROGGlobal',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'subLinks',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'poweredByText',
      type: 'text',
      label: 'Powered by Text',
      required: true,
    },
    {
      name: 'poweredByURL',
      type: 'text',
      label: 'Powered by URL',
      required: true,
    },
  ],
}

export default Navigation
