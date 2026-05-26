import type { PortableTextBlock } from '@portabletext/types';

export type BlogSection =
  | { type: 'paragraph'; content: string }
  | { type: 'h2'; content: string }
  | { type: 'h3'; content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'bulletList'; items: string[] }
  | { type: 'numberedList'; items: string[] }
  | {
      type: 'callout';
      variant: 'tip' | 'insight' | 'highlight';
      title: string;
      content: string;
      icon: string;
    }
  | {
      type: 'keyPoints';
      title: string;
      items: { icon: string; text: string }[];
    }
  | {
      type: 'stats';
      items: { icon: string; value: string; label: string }[];
    }
  | { type: 'divider' };

function blockKey() {
  return Math.random().toString(36).slice(2, 11);
}

function customBlock<T extends Record<string, unknown>>(data: T): PortableTextBlock {
  return data as unknown as PortableTextBlock;
}

function textBlock(
  text: string,
  style: 'normal' | 'h2' | 'h3' | 'blockquote',
  listItem?: 'bullet' | 'number'
): PortableTextBlock {
  const block: PortableTextBlock = {
    _type: 'block',
    _key: blockKey(),
    style: style === 'blockquote' ? 'blockquote' : style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: blockKey(),
        text: text.trim(),
        marks: [],
      },
    ],
  };

  if (listItem) {
    (block as PortableTextBlock & { listItem: string; level: number }).listItem = listItem;
    (block as PortableTextBlock & { level: number }).level = 1;
  }

  return block;
}

function listBlocks(items: string[], listItem: 'bullet' | 'number'): PortableTextBlock[] {
  return items
    .filter((item) => item?.trim())
    .map((item) => textBlock(item, 'normal', listItem));
}

export function sectionsToPortableText(sections: BlogSection[]): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];

  for (const section of sections) {
    switch (section.type) {
      case 'paragraph':
        if (section.content?.trim()) {
          blocks.push(textBlock(section.content, 'normal'));
        }
        break;
      case 'h2':
        if (section.content?.trim()) {
          blocks.push(textBlock(section.content, 'h2'));
        }
        break;
      case 'h3':
        if (section.content?.trim()) {
          blocks.push(textBlock(section.content, 'h3'));
        }
        break;
      case 'blockquote':
        if (section.content?.trim()) {
          blocks.push(textBlock(section.content, 'blockquote'));
        }
        break;
      case 'bulletList':
        blocks.push(...listBlocks(section.items ?? [], 'bullet'));
        break;
      case 'numberedList':
        blocks.push(...listBlocks(section.items ?? [], 'number'));
        break;
      case 'callout':
        if (section.title || section.content) {
          blocks.push(
            customBlock({
              _type: 'blogCallout',
              _key: blockKey(),
              variant: section.variant ?? 'insight',
              title: section.title ?? '',
              body: section.content ?? '',
              icon: section.icon ?? 'Sparkles',
            })
          );
        }
        break;
      case 'keyPoints':
        if (section.items?.length) {
          blocks.push(
            customBlock({
              _type: 'blogKeyPoints',
              _key: blockKey(),
              title: section.title ?? 'Key takeaways',
              items: section.items.map((item) => ({
                _key: blockKey(),
                icon: item.icon ?? 'Check',
                text: item.text ?? '',
              })),
            })
          );
        }
        break;
      case 'stats':
        if (section.items?.length) {
          blocks.push(
            customBlock({
              _type: 'blogStats',
              _key: blockKey(),
              items: section.items.map((item) => ({
                _key: blockKey(),
                icon: item.icon ?? 'BarChart3',
                value: item.value ?? '',
                label: item.label ?? '',
              })),
            })
          );
        }
        break;
      case 'divider':
        blocks.push(
          customBlock({
            _type: 'blogDivider',
            _key: blockKey(),
            label: '',
          })
        );
        break;
      default:
        break;
    }
  }

  return blocks;
}
