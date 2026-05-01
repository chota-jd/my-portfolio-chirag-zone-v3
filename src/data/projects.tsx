import { Globe, Sparkles, Smartphone, Code2, Layers, Cpu } from 'lucide-react';
import { ReactNode } from 'react';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  icon: ReactNode;
  color: string;
  stats?: string;
  isSpecial?: boolean;
  inauguratedBy?: string;
  detailedStats?: { label: string; value: string }[];
  pillars?: { title: string; desc: string }[];
  process?: { step: string; title: string; desc: string }[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ai-impact-pledge',
    title: 'AI Impact Pledge',
    description: 'A nationwide initiative by the Govt. of India encouraging organisations to adopt responsible and ethical AI practices.',
    fullDescription: 'The AI Impact Pledge is a transformative national movement designed to position India as a global leader in ethical AI. Launched at the AI Impact Summit Bharat 2026, it encourages citizens and organizations to formally commit to human-centric AI usage. The initiative focuses on building a foundation of trust, safety, and innovation while ensuring no citizen is left behind in the digital age.',
    image: '/projects/ai-impact.png',
    technologies: ['Responsible AI', 'Ethical AI', 'Digital Literacy', 'Entrepreneurship', 'AI for Space'],
    githubUrl: 'https://github.com/chota-jd',
    liveUrl: 'https://aipledge.indiaai.gov.in/',
    category: 'National Initiative',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-orange-500 to-green-500',
    stats: '2.8M+ Users',
    inauguratedBy: 'INDIAAI, GOVT. OF INDIA',
    detailedStats: [
      { label: 'Registered Users', value: '2.8M+' },
      { label: 'World Record', value: 'Most Pledges/24h' },
      { label: 'Badges Issued', value: '2.5M+' }
    ],
    pillars: [
      { title: 'Ethical Foundation', desc: 'Promoting transparency, accountability, and safety in every AI-driven solution.' },
      { title: 'Mass Literacy', desc: 'Democratizing AI education to ensure equitable access across all regions of India.' },
      { title: 'Inclusion by Design', desc: 'Leveraging AI as a force multiplier for accessibility and social empowerment.' },
      { title: 'Strategic Innovation', desc: 'Fostering specialized skills in high-impact areas like AI for Space and Climate.' }
    ],
    process: [
      { step: '01', title: 'Register', desc: 'Securely sign up via the IndiaAI national portal.' },
      { step: '02', title: 'Validate', desc: 'Complete a brief assessment on responsible AI ethics.' },
      { step: '03', title: 'Commit', desc: 'Take the formal digital pledge to use AI for good.' },
      { step: '04', title: 'Certify', desc: 'Download your official Government-recognized badge.' }
    ]
  },
  {
    id: 2,
    slug: 'techequity-g20-empower',
    title: 'TechEquity - G20 Empower',
    description: 'A global initiative to bridge the gender digital divide through intelligent course recommendations and gamified learning.',
    fullDescription: 'TechEquity is a flagship global platform under the G20 Empower framework, dedicated to bridging the gender digital divide. By providing high-quality, expert-led digital literacy and financial literacy courses in over 100 languages, the platform empowers women worldwide. It uses AI-driven personalization to recommend learning paths that help women thrive in the global digital economy.',
    image: '/projects/techequity.png',
    technologies: ['Personalized Learning', 'Gamified UX', 'AI Recommendations', 'Global Scaling', 'Cloud LMS'],
    githubUrl: 'https://github.com/chota-jd',
    liveUrl: 'https://techequity.g20empower.com/',
    category: 'Learning Platform',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-500',
    stats: '2M+ Women Impacted',
    inauguratedBy: 'SMT. SMRITI ZUBIN IRANI',
    detailedStats: [
      { label: 'Women Targeted', value: '1M+' },
      { label: 'Expert Courses', value: '95+' },
      { label: 'Supported Languages', value: '100+' }
    ],
    pillars: [
      { title: 'Self-Paced Growth', desc: 'Flexible learning modules designed to fit into diverse life schedules.' },
      { title: 'Global Mentorship', desc: 'Direct connection to G20 industry leaders and subject matter experts.' },
      { title: 'Multilingual Reach', desc: 'Removing language barriers with content translated into 100+ local dialects.' },
      { title: 'AI-Guided Paths', desc: 'Hyper-personalized course recommendations based on professional goals.' }
    ],
    process: [
      { step: '01', title: 'Onboard', desc: 'Create a profile and select your preferred language.' },
      { step: '02', title: 'Discover', desc: 'Explore AI-curated tracks tailored to your skills and needs.' },
      { step: '03', title: 'Engage', desc: 'Learn through interactive, gamified expert-led modules.' },
      { step: '04', title: 'Thrive', desc: 'Obtain global credentials recognized across G20 nations.' }
    ]
  },
  {
    id: 3,
    slug: 'ai-untuk-rakyat-malaysia',
    title: 'AI Untuk Rakyat - Malaysia',
    description: 'Malaysia\'s national AI education strategy driving enterprise LMS technology and integrated analytics.',
    fullDescription: 'AI Untuk Rakyat (AI for the People) is a national self-learning online program launched by the Ministry of Economy, Malaysia, in collaboration with Intel. The program aims to demystify AI for the general public, from students to senior citizens. By fostering a "Digital First Mindset," it positions Malaysia to become a regional AI hub and a leader in the global tech landscape.',
    image: '/projects/ai-malaysia.png',
    technologies: ['Enterprise LMS', 'Multi-language (4)', 'Analytics', 'National AI Office', 'Citizen Education'],
    githubUrl: 'https://github.com/chota-jd',
    liveUrl: 'https://aiur.ai.gov.my/',
    category: 'National Initiative',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-red-500 to-blue-500',
    stats: '1.3M+ Malaysians',
    inauguratedBy: 'MINISTRY OF ECONOMY, MALAYSIA',
    detailedStats: [
      { label: 'Registered Learners', value: '1.39M+' },
      { label: 'National Target', value: '1M Achieved' },
      { label: 'Public Awareness', value: '90% Outreach' }
    ],
    pillars: [
      { title: 'AI Aware', desc: 'Introducing fundamental AI concepts and capabilities to the public.' },
      { title: 'AI Appreciate', desc: 'Exploring practical AI applications, ethics, and industry impact.' },
      { title: 'Inclusive Access', desc: 'Available in Malay, English, Mandarin, and Tamil for total reach.' },
      { title: 'Digital Mindset', desc: 'Cultivating a tech-literate society ready for the future economy.' }
    ],
    process: [
      { step: '01', title: 'Identify', desc: 'Register using your mobile number with OTP verification.' },
      { step: '02', title: 'Learn', desc: 'Complete the AI Aware and AI Appreciate core modules.' },
      { step: '03', title: 'Engage', desc: 'Participate in interactive activities and foundational quizzes.' },
      { step: '04', title: 'Verify', desc: 'Earn official digital badges for your professional record.' }
    ]
  },
  {
    id: 4,
    slug: 'future-frontier',
    title: 'Future Frontier',
    description: 'Exploring the intersection of human intuition and artificial intelligence.',
    fullDescription: 'A visionary collection of upcoming digital frontiers, exploring the intersection of human intuition and artificial intelligence. This lab is dedicated to prototyping next-generation technologies that redefine how we interact with the digital world.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    technologies: ['AI', 'Web3', 'Metaverse', 'Edge Computing', 'Neural Interface'],
    githubUrl: 'https://github.com/chota-jd',
    liveUrl: '#stats',
    category: 'Visionary',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-teal-500 to-cyan-500',
    isSpecial: true,
    detailedStats: [
      { label: 'Prototypes', value: '12' },
      { label: 'Research Papers', value: '5' }
    ]
  }
];
