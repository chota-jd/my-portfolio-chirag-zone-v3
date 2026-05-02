import { Globe, Sparkles, Smartphone, Code2, Layers, Cpu, Package, Zap, Shield, Heart, BarChart, Rocket, FileText, Users, Lock, Bot, BookOpen, Bookmark } from 'lucide-react';
import { ReactNode } from 'react';

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  productLink: string;
  thumbnailImage: string;
  technologies: string[];
  category: string;
  icon: ReactNode;
  color: string;
  role: string;
  stats?: string;
  pillars?: { title: string; desc: string }[];
  process?: { step: string; title: string; desc: string }[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'docxpert',
    title: 'DocXpert',
    description: 'Transform documents with precision using advanced OCR technology and multilingual translation.',
    fullDescription: 'DocXpert is a comprehensive document processing platform that leverages cutting-edge OCR and AI to handle complex document workflows. From handwritten text recognition to structural formatting, it ensures 99.8% accuracy in processing across 50+ languages.',
    image: 'https://docxpert.in/images/og.png',
    productLink: 'https://docxpert.in/',
    thumbnailImage: 'https://docxpert.in/images/og.png',
    technologies: ['OCR', 'AI', 'NLP', 'Next.js', 'Python'],
    category: 'Document Processing',
    icon: <FileText className="w-5 h-5" />,
    color: 'from-blue-600 to-cyan-500',
    role: 'Lead Developer',
    pillars: [
      { title: 'Handwritten Recognition', desc: 'Advanced AI models capable of deciphering diverse handwriting styles.' },
      { title: 'Multilingual Translation', desc: 'Seamlessly translate documents into 50+ languages while preserving layout.' },
      { title: 'Structure Formatting', desc: 'Automatically maintain document hierarchy and formatting during conversion.' },
      { title: 'PDF OCR', desc: 'High-speed OCR for searchable and editable PDF generation.' }
    ]
  },
  {
    id: 2,
    slug: 'felloz',
    title: 'Felloz',
    description: 'A platform that turns work into community. Connect teams, share context, and collaborate in a space designed for how people work.',
    fullDescription: 'Felloz is a culture-first collaboration platform designed to bridge the gap between productivity and community. It provides teams with the tools to share context, celebrate wins, and build a unified workspace that feels like home.',
    image: 'https://myfelloz.com/felloz-og-image.png',
    productLink: 'https://myfelloz.com/',
    thumbnailImage: 'https://myfelloz.com/felloz-og-image.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    category: 'Team Collaboration',
    icon: <Users className="w-5 h-5" />,
    color: 'from-orange-500 to-pink-500',
    role: 'Core UI Engineer',
    pillars: [
      { title: 'Team Collaboration', desc: 'Real-time tools for synchronous and asynchronous team interaction.' },
      { title: 'Community Workflows', desc: 'Workflows designed to foster engagement and shared ownership.' },
      { title: 'Context Sharing', desc: 'Keep everyone aligned with centralized project context and history.' },
      { title: 'Modern Design', desc: 'A sleek, intuitive interface that prioritizes user experience and focus.' }
    ]
  },
  {
    id: 3,
    slug: 'uncloud',
    title: 'UnCloud',
    description: 'Privacy-first online tools that run 100% in your browser. No uploads, zero tracking, no sign-up required.',
    fullDescription: 'UnCloud is a revolutionary suite of 45+ utility tools built with a privacy-first mindset. Every operation happens entirely on the client side, ensuring that sensitive data never leaves the user\'s device.',
    image: 'https://uncloudnow.com/og.png',
    productLink: 'https://uncloudnow.com/',
    thumbnailImage: 'https://uncloudnow.com/og.png',
    technologies: ['WebAssembly', 'Vanilla JS', 'Service Workers', 'PWA'],
    category: 'Privacy Tools',
    icon: <Lock className="w-5 h-5" />,
    color: 'from-emerald-600 to-teal-400',
    role: 'Security Specialist',
    pillars: [
      { title: '45+ Tools', desc: 'A vast collection of PDF, image, text, and developer utilities.' },
      { title: '100% Client-side', desc: 'All processing is done in the browser; no data is ever uploaded.' },
      { title: 'Zero Tracking', desc: 'No cookies, no accounts, and no tracking scripts—total anonymity.' },
      { title: 'Offline Ready', desc: 'Works without an internet connection once loaded as a PWA.' }
    ]
  },
  {
    id: 4,
    slug: 'clef',
    title: 'Clef',
    description: 'Governed AI that keeps your organization in control. Deploy and scale AI with policy, safety, and compliance built-in.',
    fullDescription: 'Clef provides an enterprise-grade framework for deploying AI models with strict governance and compliance controls. It allows organizations to harness the power of AI while ensuring data safety and ethical standards.',
    image: 'https://useclef.com/og-image.png',
    productLink: 'https://useclef.com/',
    thumbnailImage: 'https://useclef.com/og-image.png',
    technologies: ['LLM', 'Governance API', 'React', 'AWS'],
    category: 'Enterprise AI',
    icon: <Bot className="w-5 h-5" />,
    color: 'from-cyan-600 to-blue-500',
    role: 'Full Stack Developer',
    pillars: [
      { title: 'Governed Deployment', desc: 'Centralized control over AI model access and usage patterns.' },
      { title: 'Compliance Controls', desc: 'Automated policy enforcement to meet regulatory requirements.' },
      { title: 'Org-wide Safety', desc: 'Built-in safeguards against hallucination and data leakage.' },
      { title: 'Scalable Infrastructure', desc: 'Designed to support high-throughput AI workloads across teams.' }
    ]
  },
  {
    id: 5,
    slug: 'quinto-learn',
    title: 'Quinto Learn',
    description: 'A new-generation learning platform with a personal AI guide always ready to help you go deeper.',
    fullDescription: 'Quinto Learn reimagines education through AI-driven personalization. With a 24/7 personal AI tutor and interactive lessons, it helps learners master complex subjects at their own pace.',
    image: 'https://quintolearn.com/opengraph.jpg',
    productLink: 'https://quintolearn.com/',
    thumbnailImage: 'https://quintolearn.com/opengraph.jpg',
    technologies: ['EdTech', 'AI Tutor', 'Next.js', 'GraphQL'],
    category: 'Education Tech',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-500',
    role: 'Frontend Architect',
    pillars: [
      { title: 'AI-Generated Courses', desc: 'Dynamic curriculum creation based on learner goals and pace.' },
      { title: '24/7 AI Guide', desc: 'An intelligent tutor available around the clock to answer questions.' },
      { title: 'Interactive Lessons', desc: 'Gamified and immersive learning experiences to improve retention.' },
      { title: 'Live Web Search', desc: 'Integrate real-time information into the learning process.' }
    ]
  },
  {
    id: 6,
    slug: 'memry',
    title: 'Memry',
    description: 'Save links once and never forget why they mattered. Turn fleeting tabs into a searchable contextual library.',
    fullDescription: 'Memry is a sophisticated knowledge management tool that helps users organize their digital life. By adding context and notes to saved links, it creates a searchable personal knowledge base that grows with you.',
    image: 'https://savememry.com/og-image.png',
    productLink: 'https://savememry.com/',
    thumbnailImage: 'https://savememry.com/og-image.png',
    technologies: ['Extension', 'Cloud Sync', 'NLP', 'React'],
    category: 'Knowledge Base',
    icon: <Bookmark className="w-5 h-5" />,
    color: 'from-indigo-600 to-blue-400',
    role: 'Full Stack Developer',
    pillars: [
      { title: 'Link Organization', desc: 'Save and categorize links with intuitive tagging and folders.' },
      { title: 'Contextual Notes', desc: 'Add personal insights and highlights to every saved resource.' },
      { title: 'Searchable Library', desc: 'Full-text search across your entire collection of saved content.' },
      { title: 'Revisit Collections', desc: 'Smart reminders and collections that encourage periodic review.' }
    ]
  }
];
