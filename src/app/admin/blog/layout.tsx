'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, theme } from 'antd';

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#22d3ee',
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
