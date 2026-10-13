import { Icon } from '@/components/Icon';
import { StatCard, BarChart, Sparkline } from '@/components/ui';
import { adminStats, lessons, formatFCFA } from '@/data';
import type { ScreenName } from '@/types';

type AdminDashboardProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const monthlyData = [
    { label: 'Jan', value: 180, color: 'blue' },
    { label: 'Fév', value: 220, color: 'blue' },
    { label: 'Mar', value: 195, color: 'blue' },
    { label: 'Avr', value: 280, color: 'blue' },
    { label: 'Mai', value: 310, color: 'blue' },
    { label: 'Juin', value: 350, color: 'blue' },
    { label: 'Juil', value: 320, color: 'blue' },
    { label: 'Aoû', value: 410, color: 'blue' },
    { label: 'Sep', value: 480, color: 'blue' },
    { label: 'Oct', value: 520, color: 'blue' },
  ];

  const userGrowth = [120, 180, 250, 340, 420, 580, 750, 980, 1200, 1450, 1800, 2100];

  const formatValue = (stat: typeof adminStats[0]) => {
    if (stat.label.includes('FCFA')) return `${(stat.value / 1000000).toFixed(1)}M F`;
    if (stat.label.includes('taux')) return `${stat.value}%`;
    return stat.value.toLocaleString('fr-FR');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-purple-600 to-purple-800 border-0 fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Icon name="BarChart3" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Vue d'ensemble</h2>
            <p className="text-purple-100 text-sm mt-1">Statistiques de la plateforme FinÉduq</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => (
          <div key={stat.id} style={{ animationDelay: `${i * 0.05}s` }}>
            <StatCard
              label={stat.label}
              value={formatValue(stat)}
              icon={stat.icon}
              color={stat.color}
              trend={stat.change}
              trendLabel="ce mois"
            />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly growth chart */}
        <div className="card p-6 slide-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Inscriptions mensuelles</h3>
              <p className="text-sm text-slate-500 mt-0.5">10 derniers mois</p>
            </div>
            <span className="badge-green"><Icon name="TrendingUp" size={12} /> +18%</span>
          </div>
          <BarChart data={monthlyData} />
        </div>

        {/* User growth sparkline */}
        <div className="card p-6 slide-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Croissance des utilisateurs</h3>
              <p className="text-sm text-slate-500 mt-0.5">12 derniers mois</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-bold text-slate-900">3 485</p>
            <p className="text-sm text-slate-500">utilisateurs totaux</p>
          </div>
          <div className="overflow-x-auto">
            <Sparkline data={userGrowth} width={440} height={100} color="#a855f7" />
          </div>
        </div>
      </div>

      {/* Content management */}
      <div className="card p-6 slide-up">
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title">Gestion du contenu</h3>
          <button onClick={() => onNavigate('lessons')} className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Voir tout <Icon name="ArrowRight" size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.slice(0, 6).map((lesson) => (
            <div key={lesson.id} className="card p-4 bg-slate-50 border-0">
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Icon name="BookOpen" size={18} className="text-blue-600" />
                </div>
                {lesson.completed ? (
                  <span className="badge-green text-[10px]">Publié</span>
                ) : (
                  <span className="badge-orange text-[10px]">En cours</span>
                )}
              </div>
              <p className="font-semibold text-slate-900 text-sm line-clamp-1">{lesson.title}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Icon name="Users" size={12} /> {lesson.studentsCount}</span>
                <span className="flex items-center gap-1"><Icon name="Star" size={12} /> {lesson.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent users table */}
      <div className="card overflow-hidden slide-up">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="section-title">Derniers inscrits</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-5 py-3">Utilisateur</th>
                <th className="px-5 py-3 hidden sm:table-cell">Rôle</th>
                <th className="px-5 py-3 hidden lg:table-cell">Ville</th>
                <th className="px-5 py-3 hidden sm:table-cell">Inscription</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Aya Koné', role: 'Bénéficiaire', city: 'Abidjan', date: 'Il y a 2h', status: 'active', color: 'bg-blue-500' },
                { name: 'Ibrahim Coulibaly', role: 'Bénéficiaire', city: 'Korhogo', date: 'Il y a 5h', status: 'active', color: 'bg-teal-500' },
                { name: 'Marc Assemi', role: 'Mentor', city: 'Abidjan', date: 'Hier', status: 'active', color: 'bg-emerald-500' },
                { name: 'Aminata Cissé', role: 'Bénéficiaire', city: 'San-Pédro', date: 'Il y a 2 jours', status: 'idle', color: 'bg-pink-500' },
                { name: 'Kouassi N\'Guessan', role: 'Bénéficiaire', city: 'Abidjan', date: 'Il y a 3 jours', status: 'active', color: 'bg-purple-500' },
              ].map((u, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${u.color} flex items-center justify-center text-white font-bold text-xs`}>
                        {u.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900 text-sm">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-sm text-slate-600">{u.role}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{u.city}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-sm text-slate-400">{u.date}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {u.status === 'active' ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
