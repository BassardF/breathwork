interface TimerTextProps {
  value: string;
  label?: string;
}

export function TimerText({ value, label }: TimerTextProps) {
  return (
    <div className="space-y-3 text-center">
      {label ? <p className="text-sm tracking-[0.32em] text-sky-300 uppercase font-medium">{label}</p> : null}
      <p className="text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] sm:text-8xl">{value}</p>
    </div>
  );
}
