import { FileText, Users, Lock, Bot, BookOpen, Bookmark } from 'lucide-react';
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
  platformInsights?: { label: string; value: string }[];
  narrative?: {
    overview: string;
    impact: string;
  };
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
    ],
    process: [
      { step: '01', title: 'Ingest', desc: 'Upload scans, PDFs, or image-based files from mixed document sources.' },
      { step: '02', title: 'Extract', desc: 'Run OCR and language detection pipelines to convert content into structured text.' },
      { step: '03', title: 'Refine', desc: 'Apply formatting intelligence to preserve tables, headings, and readable layout.' },
      { step: '04', title: 'Deliver', desc: 'Export clean outputs for downstream review, translation, and workflow automation.' }
    ],
    platformInsights: [
      { label: 'Primary Capability', value: 'OCR-driven document understanding and multilingual conversion' },
      { label: 'Best For', value: 'Operations teams handling high-volume, unstructured document intake' },
      { label: 'Experience Pattern', value: 'Upload -> Extract -> Validate -> Export with minimal manual effort' },
      { label: 'Outcome', value: 'Faster document turnaround with improved consistency across formats' }
    ],
    narrative: {
      overview: 'DocXpert is positioned as a practical execution platform for document-heavy teams who need speed without sacrificing quality. Its workflow is built around real-world variability, including blurry scans, handwriting, mixed languages, and inconsistent formatting. Rather than treating OCR as a single feature, the product combines extraction, structure recovery, and language workflows into one guided system.',
      impact: 'The product reduces repetitive manual data handling and shortens processing cycles for operations, compliance, and support functions. By turning static files into structured and reusable content, DocXpert helps organizations move from reactive document handling to reliable, automatable document operations.'
    }
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
    ],
    process: [
      { step: '01', title: 'Onboard Teams', desc: 'Create shared spaces and invite teams into role-based collaboration hubs.' },
      { step: '02', title: 'Organize Context', desc: 'Centralize updates, decisions, and references so work stays searchable.' },
      { step: '03', title: 'Collaborate Live', desc: 'Use real-time communication and activity streams to reduce coordination lag.' },
      { step: '04', title: 'Sustain Culture', desc: 'Encourage recognition, rituals, and transparent ownership across projects.' }
    ],
    platformInsights: [
      { label: 'Product Position', value: 'Culture-first collaboration platform for modern distributed teams' },
      { label: 'Core Value', value: 'Keeps people aligned on both task execution and team context' },
      { label: 'Interaction Model', value: 'Persistent shared spaces with synchronous and async workflows' },
      { label: 'Outcome', value: 'Stronger cross-team clarity and healthier collaboration habits' }
    ],
    narrative: {
      overview: 'Felloz focuses on the missing layer between productivity tools and human collaboration: shared context. The platform is designed so teams can communicate, track progress, and preserve institutional memory without scattering information across disconnected tools. Its UX emphasizes clarity and ease, making daily collaboration feel natural instead of heavy.',
      impact: 'By reducing context switching and making decisions traceable, Felloz helps teams maintain momentum even as projects scale. The result is not only better operational coordination, but also a stronger sense of ownership and community across departments.'
    }
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
    ],
    process: [
      { step: '01', title: 'Open Tool', desc: 'Select the required utility without account creation or onboarding friction.' },
      { step: '02', title: 'Process Locally', desc: 'Run all transformations directly in-browser on the user device.' },
      { step: '03', title: 'Review Result', desc: 'Validate outputs instantly with no waiting on remote server processing.' },
      { step: '04', title: 'Repeat Securely', desc: 'Continue usage with zero tracking and optional offline readiness.' }
    ],
    platformInsights: [
      { label: 'Privacy Model', value: '100% client-side processing with no file uploads' },
      { label: 'Tool Breadth', value: 'Multi-category utility suite across PDF, image, text, and dev tasks' },
      { label: 'Trust Signal', value: 'No sign-up, no tracking, no persistent personal data requirement' },
      { label: 'Outcome', value: 'Fast utility workflows while retaining full user data control' }
    ],
    narrative: {
      overview: 'UnCloud is intentionally built for users who care about privacy but still need daily productivity tools. Every key interaction is designed around local execution, so sensitive files remain on the device by default. This design decision makes the product especially relevant for users handling personal, legal, or business-critical content.',
      impact: 'The platform demonstrates that convenience and privacy do not have to be trade-offs. By removing account barriers and server-side dependencies, UnCloud provides quick utility access while preserving trust, which is often the deciding factor for privacy-conscious users.'
    }
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
    ],
    process: [
      { step: '01', title: 'Define Policies', desc: 'Configure usage boundaries, access controls, and compliance constraints.' },
      { step: '02', title: 'Integrate Models', desc: 'Connect approved AI providers and route requests through governance layers.' },
      { step: '03', title: 'Monitor Usage', desc: 'Track prompts, responses, and policy events with centralized visibility.' },
      { step: '04', title: 'Scale Safely', desc: 'Expand AI adoption across teams with consistent enforcement controls.' }
    ],
    platformInsights: [
      { label: 'Primary Focus', value: 'Enterprise AI governance and policy-first deployment controls' },
      { label: 'Best For', value: 'Organizations with compliance-sensitive AI adoption roadmaps' },
      { label: 'Risk Controls', value: 'Guardrails against leakage, misuse, and non-compliant behavior' },
      { label: 'Outcome', value: 'Faster AI rollout with auditable and safer operating boundaries' }
    ],
    narrative: {
      overview: 'Clef is built for enterprises that want to operationalize AI without compromising governance. Instead of treating compliance as an afterthought, the product embeds policy and safety controls into the core request lifecycle. This helps teams adopt AI tools confidently, even in regulated environments where auditability and control are mandatory.',
      impact: 'By centralizing policy enforcement and monitoring, Clef reduces the gap between experimentation and production adoption. Teams can move faster with AI because leadership and risk functions have stronger visibility into how models are being used across the organization.'
    }
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
    ],
    process: [
      { step: '01', title: 'Set Goals', desc: 'Learners define targets, skill levels, and preferred pacing strategies.' },
      { step: '02', title: 'Generate Path', desc: 'AI assembles personalized modules and recommends a learning sequence.' },
      { step: '03', title: 'Learn Interactively', desc: 'Complete guided lessons with contextual help from the AI tutor.' },
      { step: '04', title: 'Reinforce & Advance', desc: 'Use feedback loops to deepen mastery and unlock next learning tracks.' }
    ],
    platformInsights: [
      { label: 'Learning Model', value: 'AI-personalized, goal-driven, and continuously adaptive' },
      { label: 'Mentorship Layer', value: '24/7 tutor support for contextual explanations and follow-ups' },
      { label: 'Engagement Style', value: 'Interactive modules with real-time content enrichment' },
      { label: 'Outcome', value: 'Higher learner confidence and stronger knowledge retention' }
    ],
    narrative: {
      overview: 'Quinto Learn rethinks digital education around personalization and continuity. Rather than one-size-fits-all curriculum structures, the experience adapts to each learner’s intent, pace, and comprehension level. The AI guide is integrated as an active support layer, helping users move past confusion at the moment it appears.',
      impact: 'This approach makes learning more resilient for both beginners and advanced learners, because progress is tied to understanding, not just content completion. Over time, the platform supports deeper skill development with less drop-off across longer learning journeys.'
    }
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
    ],
    process: [
      { step: '01', title: 'Capture', desc: 'Save useful links instantly while browsing with lightweight actions.' },
      { step: '02', title: 'Add Context', desc: 'Attach notes, tags, and reasons so links retain meaning over time.' },
      { step: '03', title: 'Retrieve Fast', desc: 'Use full-text and metadata search to find knowledge in seconds.' },
      { step: '04', title: 'Revisit Intentionally', desc: 'Return to curated collections for periodic review and synthesis.' }
    ],
    platformInsights: [
      { label: 'Use Case', value: 'Personal knowledge capture and context-aware link management' },
      { label: 'Core Differentiator', value: 'Stores why a link matters, not just where it lives' },
      { label: 'Workflow Fit', value: 'Designed for researchers, builders, and lifelong learners' },
      { label: 'Outcome', value: 'Better recall and faster reuse of previously discovered information' }
    ],
    narrative: {
      overview: 'Memry addresses a common gap in bookmarking tools: saved links lose meaning when context is missing. The product solves this by pairing each saved resource with user intent, notes, and lightweight structure. This turns random browser saves into an evolving knowledge system that remains useful months later.',
      impact: 'As collections grow, Memry improves long-term recall and reduces rediscovery effort. Users spend less time searching the web again for something they already found and more time applying accumulated insights to real work.'
    }
  }
];
