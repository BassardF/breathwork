import { WifiOff } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SideNav } from './SideNav';
import { MobileNav } from './MobileNav';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}

export function AppShell() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    window.addEventListener('beforeinstallprompt', handlePrompt);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('beforeinstallprompt', handlePrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      setInstallPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#08111c] text-slate-100">
      <SideNav isOffline={isOffline} installPrompt={installPrompt} onInstall={handleInstall} />

      <div className="lg:ml-56">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 lg:hidden">
          <MobileNav installPrompt={installPrompt} onInstall={handleInstall} />
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Apnea Trainer</p>
          <div className="w-9" />
        </div>

        {isOffline ? (
          <div className="flex items-center justify-center gap-2 border-b border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs text-amber-100 lg:hidden">
            <WifiOff className="h-3 w-3" />
            You&apos;re offline
          </div>
        ) : null}

        <main className="mx-auto max-w-4xl px-4 pb-6 pt-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
