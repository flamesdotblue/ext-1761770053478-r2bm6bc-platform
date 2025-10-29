import { useState, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import CompensateScreen from './components/CompensateScreen';
import TripsHistory from './components/TripsHistory';
import BottomNav from './components/BottomNav';

function App() {
  const [tab, setTab] = useState('home');
  const [degraded, setDegraded] = useState(false);

  // Demo data aligned with prompts
  const todayEmissions = degraded ? 45.7 : 2.1; // kg CO2
  const terraHealth = degraded ? 15 : 95; // %

  const weeklyEmissions = useMemo(
    () => [
      { day: 'Lun', value: 3.1 },
      { day: 'Mar', value: 5.2 },
      { day: 'Mer', value: 0.8 },
      { day: 'Jeu', value: 4.7 },
      { day: 'Ven', value: todayEmissions },
      { day: 'Sam', value: 2.4 },
      { day: 'Dim', value: 1.9 },
    ],
    [todayEmissions]
  );

  const trips = [
    {
      id: 1,
      date: 'Aujourd\'hui',
      time: '14:30',
      title: 'Trajet Domicile-Travail (Voiture)',
      distance: '15 km',
      co2: 4.2,
      tone: 'red',
      mode: 'car',
    },
    {
      id: 2,
      date: 'Hier',
      time: '08:00',
      title: 'Trajet École (Vélo)',
      distance: '4 km',
      co2: 0.0,
      tone: 'green',
      mode: 'bike',
    },
    {
      id: 3,
      date: 'Mardi',
      time: '19:00',
      title: 'Courses (Bus)',
      distance: '8 km',
      co2: 0.8,
      tone: 'orange',
      mode: 'bus',
    },
  ];

  const carbonDebt = 120; // kg CO2 (for compensate screen)

  return (
    <div className={`min-h-screen flex flex-col ${degraded ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <header className="px-5 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full ${degraded ? 'bg-red-500/20' : 'bg-emerald-500/20'} flex items-center justify-center text-xs font-semibold`}>T</div>
          <div className="leading-tight">
            <p className="text-sm font-medium">Terra</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Votre compagnon climatique</p>
          </div>
        </div>
        <button
          onClick={() => setDegraded(v => !v)}
          className={`text-xs px-3 py-1.5 rounded-full border transition ${
            degraded
              ? 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20'
              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
          }`}
          aria-label="Basculer l'état d'émissions"
        >
          {degraded ? 'Simuler faible émissions' : 'Simuler pic d’émissions'}
        </button>
      </header>

      <main className="flex-1 pb-24 px-4">
        {tab === 'home' && (
          <Dashboard
            healthy={!degraded}
            todayEmissions={todayEmissions}
            terraHealth={terraHealth}
          />
        )}
        {tab === 'trips' && (
          <TripsHistory
            trips={trips}
            weeklyEmissions={weeklyEmissions}
            dark={degraded}
          />
        )}
        {tab === 'compensate' && (
          <CompensateScreen debt={carbonDebt} dark={degraded} />)
        }
        {tab === 'profile' && (
          <div className="max-w-md mx-auto mt-4">
            <div className={`rounded-2xl p-5 border ${degraded ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'} shadow-sm`}>
              <h2 className="text-lg font-semibold mb-2">Profil</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Gérez vos préférences, unités, et autorisations de localisation. Connectez vos apps de santé pour un suivi encore plus précis.</p>
            </div>
          </div>
        )}
      </main>

      <BottomNav current={tab} onChange={setTab} degraded={degraded} />
    </div>
  );
}

export default App;
