import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-sky-200 text-slate-950 hover:bg-sky-100',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-300 hover:bg-slate-900',
  danger: 'bg-rose-400 text-slate-950 hover:bg-rose-300',
};

export function Button({
  children,
  className = '',
  fullWidth = false,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`cursor-pointer rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
