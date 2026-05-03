import { useState } from 'react';
import type { SectionContent, ConceptContent } from '../types';

interface LearnArticleProps {
  content: SectionContent | ConceptContent;
  type: 'section' | 'concept';
}

function isSectionContent(content: SectionContent | ConceptContent): content is SectionContent {
  return 'sectionId' in content;
}

export function LearnArticle({ content, type }: LearnArticleProps) {
  const [open, setOpen] = useState(false);

  if (isSectionContent(content)) {
    const section = content;
    return (
      <div className="border-b border-white/6 pb-6 last:border-b-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-3 text-left cursor-pointer"
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors mt-0.5 ${
              open
                ? 'border-sky-300/40 bg-sky-950/40 text-sky-300'
                : 'border-white/15 text-slate-500 group-hover:border-white/30 group-hover:text-slate-300'
            }`}
          >
            {type === 'section' ? 'S' : 'C'}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white group-hover:text-sky-100 transition-colors">
              {section.title}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{section.subtitle}</p>
          </div>
          <span className={`text-xs text-slate-600 transition-transform ${open ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {open ? (
          <div className="mt-4 space-y-6 pl-9">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] text-sky-400/80 uppercase">Why</p>
              <p className="text-sm leading-relaxed text-slate-300">{section.whySummary}</p>
              <ul className="space-y-2">
                {section.whyDetails.map((detail, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-sky-300/50 mt-0.5 shrink-0">-</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] text-emerald-400/80 uppercase">How</p>
              <p className="text-sm leading-relaxed text-slate-300">{section.howSummary}</p>
              <ol className="space-y-2">
                {section.howSteps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-emerald-300/70 shrink-0 font-mono text-xs mt-0.5">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Tips</p>
              <ul className="space-y-1">
                {section.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-sky-300/50 mt-0.5 shrink-0">-</span>
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

  const concept = content;
  return (
    <div className="border-b border-white/6 pb-6 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start gap-3 text-left cursor-pointer"
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors mt-0.5 ${
            open
              ? 'border-sky-300/40 bg-sky-950/40 text-sky-300'
              : 'border-white/15 text-slate-500 group-hover:border-white/30 group-hover:text-slate-300'
          }`}
        >
          C
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white group-hover:text-sky-100 transition-colors">
            {concept.title}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{concept.summary}</p>
        </div>
        <span className={`text-xs text-slate-600 transition-transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open ? (
        <div className="mt-4 space-y-5 pl-9">
          <p className="text-sm leading-relaxed text-slate-300">{concept.summary}</p>
          {concept.sections.map((sec, i) => (
            <div key={i} className="space-y-2">
              <p className="text-xs tracking-[0.2em] text-sky-400/80 uppercase">{sec.heading}</p>
              <p className="text-sm leading-relaxed text-slate-400">{sec.body}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
