'use client';

import { Alert, Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { generateBlogAction, publishBlogAction } from '@/app/admin/blog/actions';
import { BLOG_CATEGORIES } from '@/lib/blog/categories';
import type { GeneratedBlogContent } from '@/lib/blog/types';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

type FormValues = {
  title: string;
  description?: string;
  category: string;
};

export default function AdminBlogPage() {
  const [form] = Form.useForm<FormValues>();
  const [generated, setGenerated] = useState<GeneratedBlogContent | null>(null);
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    try {
      const values = await form.validateFields(['title', 'category']);
      setGenerating(true);
      setError(null);
      setSuccessUrl(null);
      setGenerated(null);

      const result = await generateBlogAction({
        title: values.title,
        description: form.getFieldValue('description'),
        category: values.category,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setGenerated(result.generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }, [form]);

  const handlePublish = useCallback(async () => {
    if (!generated) {
      setError('Generate content before publishing.');
      return;
    }

    try {
      const values = await form.validateFields(['title', 'category']);
      setPublishing(true);
      setError(null);

      const result = await publishBlogAction({
        title: values.title,
        description: form.getFieldValue('description'),
        category: values.category,
        generated,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccessUrl(result.url);
      setGenerated(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setPublishing(false);
    }
  }, [form, generated]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={2} className="!mb-1 !text-white">
              Blog generator
            </Title>
            <Paragraph className="!text-gray-400">
              Generate posts with Gemini (copy, SEO, and cover image) and publish to Sanity. New
              posts appear on{' '}
              <Link href="/blog" className="text-cyan-400 hover:underline">
                /blog
              </Link>
              . Edit prompts in{' '}
              <code className="text-cyan-300/90">src/lib/blog/prompts/blog-generation.ts</code>.
            </Paragraph>
          </div>

          {error && (
            <Alert type="error" message={error} showIcon closable onClose={() => setError(null)} />
          )}

          {successUrl && (
            <Alert
              type="success"
              showIcon
              message="Published to Sanity"
              description={
                <Link href={successUrl} className="text-cyan-400 hover:underline">
                  View post → {successUrl}
                </Link>
              }
            />
          )}

          <Card className="border-white/10 bg-white/5">
            <Form form={form} layout="vertical" requiredMark={false}>
              <Form.Item
                name="title"
                label={<span className="text-gray-200">Title</span>}
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input placeholder="e.g. Building faster APIs with edge functions" size="large" />
              </Form.Item>

              <Form.Item
                name="description"
                label={<span className="text-gray-200">Description (optional)</span>}
              >
                <TextArea
                  rows={3}
                  placeholder="Angle, thesis, or notes for Gemini — optional"
                />
              </Form.Item>

              <Form.Item
                name="category"
                label={<span className="text-gray-200">Category</span>}
                rules={[{ required: true, message: 'Select a category' }]}
              >
                <Select
                  size="large"
                  placeholder="Select category"
                  options={BLOG_CATEGORIES.map((c) => ({ label: c, value: c }))}
                />
              </Form.Item>

              <Space wrap>
                <Button type="primary" size="large" loading={generating} onClick={handleGenerate}>
                  {generating ? 'Generating copy, SEO & image…' : 'Generate with Gemini'}
                </Button>
                <Button
                  size="large"
                  loading={publishing}
                  disabled={!generated}
                  onClick={handlePublish}
                >
                  Publish to Sanity
                </Button>
              </Space>
            </Form>
          </Card>

          {generated && (
            <Card
              title={<span className="text-white">Preview</span>}
              className="border-white/10 bg-white/5"
            >
              <Paragraph className="!text-gray-300">
                <Text className="text-gray-500">Excerpt: </Text>
                {generated.excerpt}
              </Paragraph>
              <Paragraph className="!text-gray-400">
                <Text className="text-gray-500">Slug: </Text>
                {generated.slug}
              </Paragraph>

              {generated.coverImageBase64 && generated.coverImageMimeType && (
                <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:${generated.coverImageMimeType};base64,${generated.coverImageBase64}`}
                    alt="Generated cover preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              {generated.coverImagePrompt && (
                <Paragraph className="!text-gray-400 !text-sm">
                  <Text className="text-gray-500">Image prompt: </Text>
                  {generated.coverImagePrompt}
                </Paragraph>
              )}

              {generated.seo && (
                <Card size="small" className="mt-4 border-white/10 bg-black/20" title="SEO preview">
                  <Paragraph className="!mb-1 !text-cyan-400 !text-base">
                    {generated.seo.metaTitle}
                  </Paragraph>
                  <Paragraph className="!mb-2 !text-gray-400 !text-sm">
                    {generated.seo.metaDescription}
                  </Paragraph>
                  <Text className="text-gray-500 text-xs">
                    Focus: {generated.seo.focusKeyword} · Keywords:{' '}
                    {generated.seo.keywords?.join(', ')}
                  </Text>
                </Card>
              )}

              <div className="mt-4 space-y-4">
                {generated.sections.map((section, index) => {
                  const key = `${section.type}-${index}`;
                  if (section.type === 'h2') {
                    return (
                      <Title key={key} level={4} className="!mb-0 !text-white">
                        {section.content}
                      </Title>
                    );
                  }
                  if (section.type === 'h3') {
                    return (
                      <Title key={key} level={5} className="!mb-0 !text-gray-100">
                        {section.content}
                      </Title>
                    );
                  }
                  if (section.type === 'blockquote') {
                    return (
                      <blockquote
                        key={key}
                        className="border-l-4 border-cyan-500/60 pl-4 italic text-gray-300"
                      >
                        {section.content}
                      </blockquote>
                    );
                  }
                  return (
                    <Paragraph key={key} className="!mb-0 !text-gray-300">
                      {section.content}
                    </Paragraph>
                  );
                })}
              </div>
            </Card>
          )}
        </Space>
      </div>
    </main>
  );
}
