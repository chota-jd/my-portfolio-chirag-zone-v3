'use client';

import Link from 'next/link';

import { markSkipIntroAndScrollTo } from '@/lib/homeNavigation';
import { ChrHover } from '@/components/ui/ChrHover';

export function HomeSectionViewMoreLink({
  href,
  sectionId,
  text = 'VIEW MORE 🡺',
}: {
  href: string;
  sectionId: string;
  text?: string;
}) {
  return (
    <Link
      href={href}
      style={{ display: 'inline-flex' }}
      onClick={() => markSkipIntroAndScrollTo(sectionId)}
    >
      <ChrHover text={text} />
    </Link>
  );
}
