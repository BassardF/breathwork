import { Download, LogOut, WifiOff } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { navItems } from './navItems';
import { signOut } from '../../lib/repository';
import { useAuthStore } from '../../stores/authStore';
import { isSupabaseConfigured } from '../../lib/supabase';

interface SideNavProps {
  isOffline: boolean;
  installPrompt: Event | null;
  onInstall: () => void;
}

export function SideNav({ isOffline, installPrompt, onInstall }: SideNavProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-56 flex-col border-r border-white/10 bg-[#08111c] p-6 lg:flex">
      <div>
        <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Apnea Trainer</p>
        <p className="mt-2 text-xs text-slate-400">
          {isSupabaseConfigured && user
            ? `Signed in as ${user.email}`
            : 'Focused dry-land breathwork.'}
        </p>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-slate-800 text-sky-100'
                  : 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        {isOffline ? (
          <div className="flex items-center justify-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs text-amber-100">
            <WifiOff className="h-3 w-3" />
            Offline
          </div>
        ) : null}
        {installPrompt ? (
          <Button variant="secondary" fullWidth onClick={onInstall}>
            <Download className="mr-2 inline h-4 w-4" />
            Install
          </Button>
        ) : null}
        {user ? (
          <Button variant="ghost" fullWidth onClick={() => void signOut()}>
            <LogOut className="mr-2 inline h-4 w-4" />
            Sign out
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
