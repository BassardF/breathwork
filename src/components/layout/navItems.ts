import { BarChart3, HeartPulse, MoonStar, Timer, Wind } from 'lucide-react';

export const navItems = [
  { to: '/', label: 'Hold', icon: Timer },
  { to: '/co2', label: 'CO2', icon: HeartPulse },
  { to: '/o2', label: 'O2', icon: MoonStar },
  { to: '/patterns', label: 'Breathe', icon: Wind },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
] as const;
