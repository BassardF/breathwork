interface TimerTextProps {
  value: string;
  label?: string;
}

export function TimerText({ value, label }: TimerTextProps) {
  return (
    <div className="space-y-2 text-center">
      {label ? <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">{label}</p> : null}
      <p className="text-6xl font-semibold tracking-tight text-white sm:text-7xl">{value}</p>
    </div>
  );
}
