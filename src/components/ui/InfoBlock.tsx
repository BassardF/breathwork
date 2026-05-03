import { useState } from 'react';

interface InfoBlockProps {
  description: string;
  tips: string[];
}

export function InfoBlock({ description, tips }: InfoBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/6 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-2 text-left"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors ${
            open
              ? 'border-sky-300/40 bg-sky-950/40 text-sky-300'
              : 'border-white/15 text-slate-500 group-hover:border-white/30 group-hover:text-slate-300'
          }`}
        >
          ?
        </span>
        <span className="text-xs tracking-[0.2em] text-slate-500 uppercase group-hover:text-slate-300 transition-colors">
          Info & Tips
        </span>
      </button>
      {open ? (
        <div className="mt-3 space-y-3 pl-7">
          <p className="text-sm leading-relaxed text-slate-400">{description}</p>
          <div className="space-y-1.5">
            <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Tips</p>
            <ul className="space-y-1">
              {tips.map((tip, i) => (
                <li key={i} className="text-sm text-slate-400 flex gap-2">
                  <span className="text-sky-300/70 mt-0.5 shrink-0">-</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
