import { defineField, defineType } from 'sanity';

export const blogCallout = defineType({
  name: 'blogCallout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Tip', value: 'tip' },
          { title: 'Insight', value: 'insight' },
          { title: 'Highlight', value: 'highlight' },
        ],
      },
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Icon (Lucide name)',
      type: 'string',
      description: 'e.g. Lightbulb, TrendingUp, Rocket',
    }),
  ],
});

export const blogKeyPoints = defineType({
  name: 'blogKeyPoints',
  title: 'Key points',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});

export const blogDivider = defineType({
  name: 'blogDivider',
  title: 'Divider',
  type: 'object',
  fields: [defineField({ name: 'label', title: 'Label (optional)', type: 'string' })],
});

export const blogStats = defineType({
  name: 'blogStats',
  title: 'Stats row',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});
