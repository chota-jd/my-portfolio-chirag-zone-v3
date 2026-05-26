import type { PortableTextBlock } from '@portabletext/types';

export type BlogSection = {
  type: 'paragraph' | 'h2' | 'h3' | 'blockquote';
  content: string;
};

function blockKey() {
  return Math.random().toString(36).slice(2, 11);
}

export function sectionsToPortableText(sections: BlogSection[]): PortableTextBlock[] {
  return sections
    .filter((section) => section.content?.trim())
    .map((section) => {
      const style =
        section.type === 'h2' ? 'h2' : section.type === 'h3' ? 'h3' : 'normal';

      const block: PortableTextBlock = {
        _type: 'block',
        _key: blockKey(),
        style,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: blockKey(),
            text: section.content.trim(),
            marks: [],
          },
        ],
      };

      if (section.type === 'blockquote') {
        block.style = 'blockquote';
      }

      return block;
    });
}
