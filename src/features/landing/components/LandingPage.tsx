import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Link
        to="/login"
        className="inline-block cursor-pointer rounded-full bg-sky-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
      >
        Get Started
      </Link>
    </div>
  );
}
