import { Menu, X, Download, LogOut } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { navItems } from './navItems';
import { signOut } from '../../lib/repository';
import { useAuthStore } from '../../stores/authStore';

interface MobileNavProps {
  installPrompt: Event | null;
  onInstall: () => void;
}

export function MobileNav({ installPrompt, onInstall }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isLocalMode = useAuthStore((state) => state.isLocalMode);
  const setLocalMode = useAuthStore((state) => state.setLocalMode);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-400 hover:text-slate-200 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 p-6 shadow-xl transition-transform duration-200 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">
            Apnea Trainer
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-200"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
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
          ) : isLocalMode ? (
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setLocalMode(false)}
            >
              <LogOut className="mr-2 inline h-4 w-4" />
              Sign in
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
