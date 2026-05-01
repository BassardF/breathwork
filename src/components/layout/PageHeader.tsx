interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? <p className="text-xs tracking-[0.3em] text-slate-500 uppercase">{eyebrow}</p> : null}
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
    </header>
  );
}
