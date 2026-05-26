import {
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  LineChart,
  MapPin,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb,
  TrendingUp,
  Rocket,
  Target,
  Globe,
  Cpu,
  Users,
  Zap,
  BarChart3,
  MapPin,
  Brain,
  Code2,
  Briefcase,
  LineChart,
  Shield,
  Sparkles,
  Building2,
  GraduationCap,
  Network,
  Layers,
  Check: Sparkles,
};

export default function BlogIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = (name && ICON_MAP[name]) || Sparkles;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
