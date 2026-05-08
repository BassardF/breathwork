import {
  BarChart3,
  BookHeart,
  HeartPulse,
  MoonStar,
  Settings,
  Timer,
  Wind,
} from 'lucide-react';

export const navItems = [
  { to: '/hold', label: 'Hold', icon: Timer },
  { to: '/co2', label: 'CO2', icon: HeartPulse },
  { to: '/o2', label: 'O2', icon: MoonStar },
  { to: '/patterns', label: 'Breathe', icon: Wind },
  { to: '/learn', label: 'Learn', icon: BookHeart },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
] as const;
