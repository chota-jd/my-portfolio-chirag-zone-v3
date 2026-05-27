'use client';

import React from 'react';

// Character lookup helper that emulates i18n's getCharHTML
const getCharHTML = (ch: string) => {
  if (ch === ' ') return '\u00A0';
  if (ch === '🡲' || ch === '🡺') {
    return (
      <svg
        style={{ width: '1.25em', height: '1.25em', display: 'inline-block', verticalAlign: '-0.25em' }}
        viewBox="0 0 84 85"
        fill="currentColor"
      >
        <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
      </svg>
    );
  }
  if (ch === '🡼') {
    return (
      <svg
        style={{ width: '1.25em', height: '1.25em', display: 'inline-block', verticalAlign: '-0.25em' }}
        viewBox="0 0 84 85"
        fill="currentColor"
      >
        <g transform="rotate(-135 42 42.5)">
          <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
        </g>
      </svg>
    );
  }
  if (ch === '🞣') {
    return (
      <svg
        style={{
          width: '0.9em',
          height: '0.9em',
          display: 'inline-block',
          verticalAlign: '-0.1em',
          transform: 'translateY(-0.1em)',
        }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
      </svg>
    );
  }
  return ch;
};

interface ChrHoverProps {
  text: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  'aria-label'?: string;
}

export function ChrHover({
  text,
  href,
  target,
  rel,
  onClick,
  className = '',
  'aria-label': ariaLabel,
}: ChrHoverProps) {
  const innerContent = [...text].map((ch, idx) => (
    <span key={idx} className="ch-wrap" style={{ '--i': idx } as React.CSSProperties}>
      <span className="ch-top">{getCharHTML(ch)}</span>
      <span className="ch-bot">{getCharHTML(ch)}</span>
    </span>
  ));

  const classes = `chr-hover ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel || text}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <span onClick={onClick} className={classes} style={{ cursor: 'pointer' }} aria-label={ariaLabel || text}>
      {innerContent}
    </span>
  );
}
