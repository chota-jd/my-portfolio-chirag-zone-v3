import type { NextConfig } from 'next';
import path from 'path';

const reactDir = path.resolve('./node_modules/react');
const reactDomDir = path.resolve('./node_modules/react-dom');

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['sanity', 'next-sanity'],
  // Sanity needs project React 19.2 (useEffectEvent). Next bundles an older copy.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: reactDir,
        'react-dom': reactDomDir,
        'react/jsx-runtime': path.join(reactDir, 'jsx-runtime.js'),
        'react/jsx-dev-runtime': path.join(reactDir, 'jsx-dev-runtime.js'),
        'react-dom/client': path.join(reactDomDir, 'client.js'),
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
