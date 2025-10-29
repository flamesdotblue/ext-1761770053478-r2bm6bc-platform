import { Car, Bus, Bike, BarChart3 } from 'lucide-react';

export default function TripsHistory({ trips = [], weeklyEmissions = [], dark = false }) {
  const card = `rounded-2xl p-4 border ${dark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'} shadow-sm`;

  const max = Math.max(1, ...weeklyEmissions.map(d => d.value));

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className={card}>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-5 w-5 text-sky-600" />
          <p className="text-sm font-medium">Émissions hebdomadaires</p>
        </div>
        <div className="flex items-end justify-between gap-2 h-28">
          {weeklyEmissions.map((d) => (
            <div key={d.day} className="flex flex-col items-center flex-1">
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-md overflow-hidden h-full flex items-end">
                <div
                  style={{ height: `${(d.value / max) * 100}%` }}
                  className={`w-full ${d.value > 10 ? 'bg-red-500' : d.value > 3 ? 'bg-orange-400' : 'bg-emerald-500'}`}
                />
              </div>
              <span className="text-[10px] mt-1 text-zinc-500 dark:text-zinc-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <p className="text-sm font-medium mb-3">Historique des Trajets</p>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {trips.map((t) => (
            <TripRow key={t.id} trip={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TripRow({ trip }) {
  const toneMap = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    green: 'text-emerald-600',
  };
  const iconMap = {
    car: <Car className="h-4 w-4" />,
    bus: <Bus className="h-4 w-4" />,
    bike: <Bike className="h-4 w-4" />,
  };

  return (
    <div className="py-3 flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        {iconMap[trip.mode] || <Car className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{trip.date} - {trip.time} | {trip.title}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{trip.distance}</p>
      </div>
      <div className={`text-sm font-semibold ${toneMap[trip.tone] || 'text-zinc-500'}`}>
        {trip.co2 > 0 ? `+ ${trip.co2.toFixed(1)} kg CO2` : '0.0 kg CO2'}
      </div>
    </div>
  );
}
