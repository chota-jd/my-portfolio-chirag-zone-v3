'use client';

import { Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

const STORAGE_USERNAME = 'chirag_ portfolio_admin_username';
const STORAGE_PASSWORD = 'chirag_ portfolio_admin_password';
const ADMIN_PASSWORD = 'dfdfd';

type AuthFormValues = {
  username: string;
  password: string;
};

export function getStoredAdminBlogAuth(): { username: string; password: string } | null {
  if (typeof window === 'undefined') return null;
  const username = localStorage.getItem(STORAGE_USERNAME);
  const password = localStorage.getItem(STORAGE_PASSWORD);
  if (!username || !password) return null;
  return { username, password };
}

export function isAdminBlogAuthenticated(): boolean {
  const stored = getStoredAdminBlogAuth();
  return stored?.password === ADMIN_PASSWORD;
}

export default function AdminBlogAuthModal({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [form] = Form.useForm<AuthFormValues>();

  useEffect(() => {
    const stored = getStoredAdminBlogAuth();
    if (stored && stored.password === ADMIN_PASSWORD) {
      onAuthenticated();
      setOpen(false);
      return;
    }

    setOpen(true);
    if (stored) {
      form.setFieldsValue({
        username: stored.username,
        password: stored.password,
      });
    }
  }, [form, onAuthenticated]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      setAuthError(null);

      if (values.password !== ADMIN_PASSWORD) {
        setAuthError('Incorrect password.');
        return;
      }

      localStorage.setItem(STORAGE_USERNAME, values.username.trim());
      localStorage.setItem(STORAGE_PASSWORD, values.password);

      setOpen(false);
      onAuthenticated();
    } catch {
      // validation errors handled by antd form
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleSubmit}
      onCancel={() => {}}
      okText="Continue"
      cancelButtonProps={{ style: { display: 'none' } }}
      confirmLoading={submitting}
      closable={false}
      maskClosable={false}
      keyboard={false}
      centered
      width={440}
      destroyOnHidden={false}
      title={null}
      rootClassName="admin-blog-auth-modal"
      className="admin-blog-auth-modal"
      styles={{
        mask: {
          backdropFilter: 'blur(12px)',
          background: 'rgba(0, 0, 0, 0.82)',
        },
        content: {
          background: 'linear-gradient(165deg, rgba(24,24,27,0.98) 0%, rgba(9,9,11,0.99) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 28,
          boxShadow: '0 0 60px rgba(79, 193, 198, 0.12), 0 24px 48px rgba(0, 0, 0, 0.5)',
          padding: 0,
          overflow: 'hidden',
        },
        body: {
          position: 'relative',
          padding: '28px 28px 8px',
        },
        footer: {
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '16px 28px 24px',
          background: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      okButtonProps={{
        size: 'large',
        className: 'admin-blog-auth-submit',
        style: {
          height: 44,
          minWidth: 140,
          fontWeight: 600,
          border: 'none',
          background: 'linear-gradient(110deg, #4fc1c6 0%, #7ce7eb 50%, #4fc1c6 100%)',
          color: '#0a0a0f',
          boxShadow: '0 0 24px rgba(79, 193, 198, 0.35)',
        },
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4fc1c6]/60 to-transparent" />

      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Blog generator</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Sign in to generate and publish posts. Credentials are stored in this browser only.
        </p>
      </div>

      {authError && (
        <div
          className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-300"
          role="alert"
        >
          {authError}
        </div>
      )}

      <Form form={form} layout="vertical" requiredMark={false} className="admin-blog-auth-form">
        <Form.Item
          name="username"
          label={<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Username</span>}
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input
            placeholder="Enter username"
            autoComplete="username"
            size="large"
            className="admin-blog-auth-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Password</span>}
          rules={[{ required: true, message: 'Password is required' }]}
          className="!mb-2"
        >
          <Input.Password
            placeholder="Enter password"
            autoComplete="current-password"
            size="large"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
