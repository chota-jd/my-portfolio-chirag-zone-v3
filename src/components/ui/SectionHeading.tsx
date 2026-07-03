import type { ReactNode } from 'react';

type SectionHeadingProps = {
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Wrapper bottom margin */
  spacing?: 'sm' | 'md' | 'lg';
  as?: 'h1' | 'h2';
};

const spacingClass = {
  sm: 'mb-12',
  md: 'mb-16',
  lg: 'mb-20',
} as const;

export default function SectionHeading({
  children,
  subtitle,
  className = '',
  titleClassName = '',
  spacing = 'md',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${spacingClass[spacing]} ${className}`}>
      <Tag className={`mb-6 text-4xl font-bold tracking-tight sm:text-5xl ${titleClassName}`}>{children}</Tag>
      <div className="section-heading-accent mx-auto mb-6" aria-hidden />
      {subtitle ? (
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
