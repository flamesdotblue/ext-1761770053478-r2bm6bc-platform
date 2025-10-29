import { Home, Map, Leaf, User } from 'lucide-react';

export default function BottomNav({ current, onChange, degraded }) {
  const items = [
    { key: 'home', label: 'Accueil', icon: Home },
    { key: 'trips', label: 'Trajets', icon: Map },
    { key: 'compensate', label: 'Compenser', icon: Leaf },
    { key: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${degraded ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/90 border-zinc-200'} backdrop-blur supports-[backdrop-filter]:bg-opacity-80 border-t`}
      role="tablist"
      aria-label="Navigation principale"
    >
      <div className="max-w-md mx-auto grid grid-cols-4">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            role="tab"
            aria-selected={current === item.key}
            className={`flex flex-col items-center justify-center py-3 text-xs ${
              current === item.key
                ? degraded
                  ? 'text-emerald-300'
                  : 'text-emerald-600'
                : 'text-zinc-500'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
