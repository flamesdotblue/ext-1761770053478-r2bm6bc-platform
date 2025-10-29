import { motion } from 'framer-motion';
import { Leaf, Trash2, Flag } from 'lucide-react';

export default function CompensateScreen({ debt = 0, dark = false }) {
  const container = `max-w-md mx-auto ${dark ? '' : ''}`;
  const card = `rounded-2xl p-4 border ${dark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'} shadow-sm`;

  return (
    <div className={container}>
      <div className={`${card} mb-4`}>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Votre dette carbone</p>
        <p className={`text-2xl font-semibold ${dark ? 'text-red-300' : 'text-red-600'}`}>{debt} kg CO2</p>
      </div>

      <div className="space-y-3">
        <ActionCard
          icon={<Leaf className="h-5 w-5 text-emerald-600" />}
          title="Planter 5 Arbres"
          subtitle="Compense 50 kg CO2 - Coût : 10€"
          cta="Agir maintenant"
          onClick={() => alert('Merci pour votre contribution !')}
          dark={dark}
        />
        <ActionCard
          icon={<Trash2 className="h-5 w-5 text-orange-500" />}
          title="Participer à un nettoyage de parc"
          subtitle="Compense 20 kg CO2 (Effort)"
          cta="Je participe"
          onClick={() => alert('Super ! Événement ajouté à votre agenda.')} 
          dark={dark}
        />
        <ActionCard
          icon={<Flag className="h-5 w-5 text-sky-600" />}
          title="Challenge : 2 Jours sans Voiture"
          subtitle="Évite 30 kg CO2"
          cta="Relever le défi"
          onClick={() => alert('Défi lancé !')} 
          dark={dark}
        />
      </div>
    </div>
  );
}

function ActionCard({ icon, title, subtitle, cta, onClick, dark }) {
  return (
    <div className={`rounded-2xl border ${dark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'} p-4 flex items-center justify-between gap-3`}>
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${dark ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`text-sm px-3 py-1.5 rounded-lg font-medium ${dark ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
      >
        {cta}
      </motion.button>
    </div>
  );
}
