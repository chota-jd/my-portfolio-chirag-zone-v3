import HomePage from '@/components/HomePage';
import JsonLd from '@/components/seo/JsonLd';
import BlogSection, { HOMEPAGE_BLOG_LIMIT } from '@/components/sections/BlogSection';
import { buildHomeJsonLd } from '@/lib/seo/json-ld';

export default function Home() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <HomePage>
        <BlogSection limit={HOMEPAGE_BLOG_LIMIT} />
      </HomePage>
    </>
  );
}
