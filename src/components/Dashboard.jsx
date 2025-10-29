import { motion } from 'framer-motion';
import { AlertTriangle, Heart } from 'lucide-react';

export default function Dashboard({ healthy, todayEmissions, terraHealth }) {
  return (
    <div className="max-w-md mx-auto">
      <TerraCard healthy={healthy} todayEmissions={todayEmissions} terraHealth={terraHealth} />
    </div>
  );
}

function TerraCard({ healthy, todayEmissions, terraHealth }) {
  const healthColor = healthy ? 'bg-emerald-500' : 'bg-red-500';
  const containerStyle = healthy
    ? 'from-emerald-50 to-sky-50 border-zinc-200'
    : 'from-zinc-900 to-zinc-800 border-zinc-800';
  const textMuted = healthy ? 'text-zinc-600' : 'text-zinc-400';

  return (
    <div className={`rounded-3xl p-5 border bg-gradient-to-b ${containerStyle} shadow-sm`}
      aria-live="polite"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium">Empreinte du Jour</p>
          <p className={`text-3xl font-bold ${healthy ? 'text-emerald-700' : 'text-red-400'}`}>{todayEmissions.toFixed(1)} kg CO2</p>
        </div>
        {!healthy && (
          <div className="flex items-center gap-1 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">Élevée</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="relative"
        >
          <TerraVisual healthy={healthy} />
        </motion.div>

        <div className="w-full mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Heart className={`h-4 w-4 ${healthy ? 'text-emerald-500' : 'text-red-400'}`} />
              <span className="text-sm font-medium">Santé de Terra</span>
            </div>
            <span className={`text-sm ${textMuted}`}>{terraHealth}%</span>
          </div>
          <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${terraHealth}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full ${healthColor}`}
            />
          </div>
        </div>

        {!healthy && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full py-3 rounded-xl bg-red-500 text-white font-medium shadow-sm hover:bg-red-600"
            onClick={() => {
              const el = document.querySelector('#cta-compensate');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Il est temps de se racheter !
          </motion.button>
        )}
      </div>

      {healthy && (
        <p className={`mt-4 text-sm ${textMuted}`}>Super ! Continuez sur cette lancée. Des déplacements doux renforcent la santé de Terra.</p>
      )}

      {/* Anchor section for CTA scrolling */}
      <div id="cta-compensate" className="mt-6" />
    </div>
  );
}

function TerraVisual({ healthy }) {
  // Visual representation: a cute planet with expressive face
  const faceColor = healthy ? 'bg-sky-300' : 'bg-zinc-500';
  const landColor = healthy ? 'bg-emerald-500' : 'bg-amber-900';
  const blushColor = healthy ? 'bg-rose-300' : 'bg-zinc-600';
  const aura = healthy ? 'from-emerald-200/50 to-sky-200/50' : 'from-red-500/20 to-zinc-600/20';

  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className={`h-40 w-40 rounded-full ${faceColor} shadow-lg flex items-center justify-center relative overflow-hidden`}
      >
        {/* Aura glow */}
        <div className={`absolute -inset-4 rounded-full blur-2xl bg-gradient-to-br ${aura}`} />
        {/* Continents */}
        <div className={`absolute top-6 left-6 h-8 w-14 rounded-full ${landColor} rotate-12 opacity-90`} />
        <div className={`absolute bottom-6 right-5 h-10 w-16 rounded-full ${landColor} -rotate-6 opacity-90`} />
        {/* Face */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-6">
            <div className={`h-3 w-3 rounded-full bg-zinc-900 ${!healthy ? 'opacity-80' : ''}`} />
            <div className={`h-3 w-3 rounded-full bg-zinc-900 ${!healthy ? 'opacity-80' : ''}`} />
          </div>
          {healthy ? (
            <div className="mt-2 h-3 w-8 rounded-b-full bg-zinc-900" />
          ) : (
            <div className="mt-2 h-2 w-6 rounded-full bg-zinc-900" />
          )}
          <div className="flex gap-6 mt-1">
            <div className={`h-1.5 w-3 rounded-full ${blushColor}`} />
            <div className={`h-1.5 w-3 rounded-full ${blushColor}`} />
          </div>
        </div>
        {/* Cough smoke for degraded state */}
        {!healthy && (
          <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0.1, 0.6, 0], x: [0, 12, 18], y: [0, -8, -16] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }}
            className="absolute right-2 top-14 h-3 w-3 bg-zinc-400/70 rounded-full"/>
        )}
      </motion.div>
    </div>
  );
}
