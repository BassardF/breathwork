import { NavLink } from 'react-router-dom';
import { navItems } from './navItems';

export function BottomNav() {
  return (
    <nav className="sticky bottom-4 z-20 mt-10">
      <div className="mx-auto grid max-w-3xl rounded-full border border-white/10 bg-slate-950 p-2 shadow-[0_8px_20px_rgba(0,0,0,0.22)]" style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-full px-2 py-3 text-[11px] transition ${isActive ? 'bg-slate-800 text-sky-100' : 'text-slate-500 hover:text-slate-200'}`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
