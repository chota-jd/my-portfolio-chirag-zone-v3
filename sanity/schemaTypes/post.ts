import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Chirag Prajapati',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on cards and SEO fallback.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          description: '50–60 characters for Google.',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          description: '140–160 characters for search snippets.',
        }),
        defineField({
          name: 'focusKeyword',
          title: 'Focus keyword',
          type: 'string',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'ogTitle',
          title: 'Open Graph title',
          type: 'string',
        }),
        defineField({
          name: 'ogDescription',
          title: 'Open Graph description',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: 'coverImagePrompt',
      title: 'Cover image prompt (AI)',
      type: 'text',
      rows: 4,
      description: 'Prompt used to generate the cover image. Edit in blog-generation.ts for future posts.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'blogCallout' },
        { type: 'blogKeyPoints' },
        { type: 'blogStats' },
        { type: 'blogDivider' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Draft',
      };
    },
  },
});
