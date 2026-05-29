import { Globe, Sparkles, Smartphone } from 'lucide-react';
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
  platformInsights?: { label: string; value: string }[];
  narrative?: {
    overview: string;
    impact: string;
  };
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  impact?: string;
  services?: string[];
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
    ],
    platformInsights: [
      { label: 'Official Host', value: 'IndiaAI Mission (MeitY) with Intel India' },
      { label: 'Core Flow', value: 'OTP Register -> Responsible AI Quiz -> Digital Pledge -> Badge' },
      { label: 'User Effort', value: 'Approx. 5-7 minutes per completion' },
      { label: 'Participation Moment', value: 'Guinness attempt window: 16-17 Feb 2026 (24h)' }
    ],
    narrative: {
      overview: 'AI Impact Pledge is designed as a public-first civic platform where participation feels simple and trusted. The portal uses an OTP-based entry, a short responsible AI quiz, and an on-screen guided pledge so users can understand the intent before they commit. The flow is intentionally lightweight, making it easy for citizens, students, and professionals to complete the journey quickly from any device.',
      impact: 'What makes this initiative meaningful is how policy goals are translated into repeatable digital behavior. Instead of only spreading awareness through campaigns, the platform converts awareness into measurable participation through pledges and badges. This creates a visible social layer around responsible AI adoption and helps build long-term momentum for ethical technology practices at national scale.'
    },
    year: '2026',
    role: 'Full Stack · Civic Tech',
    challenge:
      'Scale a national pledge campaign where millions of citizens needed a frictionless, trustworthy flow—without compromising security, accessibility, or clarity around responsible AI.',
    solution:
      'Designed a guided journey from OTP registration through a short ethics quiz to a digital pledge and downloadable badge, with progress states and mobile-first layouts that work on low-bandwidth devices.',
    features: [
      'OTP-based registration with secure session handling',
      'Responsible AI quiz with clear pass/fail feedback',
      'On-screen pledge ceremony with shareable completion state',
      'Government-recognized digital badge generation',
      'High-concurrency readiness for peak campaign traffic',
      'Analytics-friendly event tracking for participation milestones',
    ],
    impact:
      '2.8M+ registered users, 2.5M+ badges issued, and a Guinness World Record attempt window—proving civic platforms can combine policy intent with product-grade UX at national scale.',
    services: ['Full Stack Web Apps', 'System Architecture', 'UI/UX Design', 'Performance Engineering'],
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
    ],
    platformInsights: [
      { label: 'Launch Context', value: 'Announced during India G20 Presidency 2023' },
      { label: 'Coverage', value: 'Active users reported from 80+ countries' },
      { label: 'Learning Inventory', value: '1000+ free courses by global partners' },
      { label: 'Top Journeys', value: 'Explore Courses, Learning Hub, Events & Webinars' }
    ],
    narrative: {
      overview: 'TechEquity operates as a discovery and growth ecosystem rather than a single-course website. Learners can browse curated pathways, compare course options, and move across categories like digital literacy, financial literacy, and technology skills. The platform experience is built to reduce friction for first-time learners while still giving advanced users enough depth to continue upskilling.',
      impact: 'The strongest outcome of TechEquity is accessibility at scale: high-quality learning opportunities are aggregated in one place and made free to access. By combining global partners, multilingual access patterns, and career-focused course tracks, the project supports women in building practical digital confidence that can translate into better employability and stronger economic participation.'
    },
    year: '2023',
    role: 'Full Stack · EdTech',
    challenge:
      'Bridge the gender digital divide with a global learning hub that must feel personal, multilingual, and engaging—not like a static course catalog.',
    solution:
      'Built a discovery-first LMS experience with AI-guided pathways, gamified progress cues, and partner course aggregation so learners always know what to take next.',
    features: [
      'Personalized course recommendations by goals and skill level',
      'Multilingual content discovery across 100+ languages',
      'Gamified learning hub with progress and milestones',
      'Events, webinars, and partner integrations in one flow',
      'Scalable cloud LMS architecture for global traffic',
      'Admin-ready structure for content and partner onboarding',
    ],
    impact:
      '1M+ women targeted, 95+ expert courses, and learners across 80+ countries—turning G20 Empower policy into a living digital skills ecosystem.',
    services: ['Full Stack Web Apps', 'Cloud LMS Integration', 'UI/UX Design', 'API Architecture'],
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
    ],
    platformInsights: [
      { label: 'Program Type', value: 'Free self-learning national AI literacy initiative' },
      { label: 'Curriculum', value: 'Two modules: AI Aware + AI Appreciate (<4h combined)' },
      { label: 'Language Reach', value: 'Bahasa Malaysia, English, Mandarin, Tamil' },
      { label: 'Scale Milestone', value: '1M+ completions achieved in under 6 months' }
    ],
    narrative: {
      overview: 'AI Untuk Rakyat is structured as a mass-adoption learning experience that introduces AI in a non-technical and approachable format. The two-module progression helps users first understand what AI is, and then move into practical understanding of ethics, use cases, and responsibility. This makes the platform relevant for broad demographics, not only for technical professionals.',
      impact: 'The program demonstrates how national digital literacy initiatives can move fast when content is localized and the journey is clear. Multilingual support, badge-based recognition, and self-paced delivery create a model where citizens can participate on their own schedule while still feeling part of a coordinated national transformation effort.'
    },
    year: '2024',
    role: 'Full Stack · National Program',
    challenge:
      'Demystify AI for all Malaysians—from students to seniors—via a self-paced national program that had to ship in four languages and hit 1M completions quickly.',
    solution:
      'Delivered a two-module LMS (AI Aware → AI Appreciate) with OTP onboarding, interactive activities, quizzes, and digital badges—optimized for mobile-first, low-friction completion.',
    features: [
      'Enterprise LMS with modular lesson and quiz flows',
      'Four-language support (BM, English, Mandarin, Tamil)',
      'OTP mobile verification for trusted enrollment',
      'Badge issuance and completion tracking at scale',
      'National analytics dashboard readiness',
      'Accessible UI for non-technical audiences',
    ],
    impact:
      '1.39M+ registered learners, 1M national target achieved in under six months, and 90% public awareness outreach—proving mass AI literacy can move at startup speed.',
    services: ['Full Stack Web Apps', 'Enterprise LMS', 'Multilingual UX', 'Analytics Integration'],
  },
];
