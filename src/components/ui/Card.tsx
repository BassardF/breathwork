import type { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
}

export function Card({ children, className = '' }: PropsWithChildren<CardProps>) {
  return (
    <section className={`rounded-[32px] border border-white/8 bg-slate-900 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${className}`}>
      {children}
    </section>
  );
}
