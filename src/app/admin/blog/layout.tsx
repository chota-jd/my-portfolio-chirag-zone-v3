'use client';

import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, theme } from 'antd';

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4fc1c6',
          colorBgElevated: '#18181b',
          colorBorder: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 12,
          fontFamily: 'var(--font-jost), system-ui, sans-serif',
        },
        components: {
          Modal: {
            contentBg: '#18181b',
            headerBg: 'transparent',
            titleColor: '#ffffff',
            colorIcon: '#a1a1aa',
          },
          Input: {
            colorBgContainer: 'rgba(255, 255, 255, 0.04)',
            hoverBg: 'rgba(255, 255, 255, 0.06)',
            activeBg: 'rgba(255, 255, 255, 0.06)',
            colorBorder: 'rgba(255, 255, 255, 0.1)',
            colorText: '#ffffff',
            colorTextPlaceholder: '#52525b',
            activeBorderColor: '#4fc1c6',
            hoverBorderColor: 'rgba(79, 193, 198, 0.4)',
            activeShadow: '0 0 0 2px rgba(79, 193, 198, 0.2)',
            borderRadius: 12,
            controlHeightLG: 48,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
