import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-sky-100 uppercase">
      {children}
    </span>
  );
}
