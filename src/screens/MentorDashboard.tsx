import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProgressBar, StatCard, Sparkline } from '@/components/ui';
import { mentorStudents } from '@/data';
import type { ScreenName } from '@/types';

type MentorDashboardProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function MentorDashboard({ onNavigate }: MentorDashboardProps) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const filtered = mentorStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = mentorStudents.filter((s) => s.status === 'active').length;
  const totalSavings = mentorStudents.reduce((sum, s) => sum + s.savingsTotal, 0);
  const avgProgress = Math.round(mentorStudents.reduce((sum, s) => sum + s.progress, 0) / mentorStudents.length);

  const student = mentorStudents.find((s) => s.id === selectedStudent);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-emerald-600 to-teal-700 border-0 fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Icon name="Users" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Mes élèves</h2>
            <p className="text-emerald-100 text-sm mt-1">Suis et accompagne leurs progrès</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Élèves total" value={`${mentorStudents.length}`} icon="Users" color="blue" />
        <StatCard label="Actifs aujourd'hui" value={`${activeCount}`} icon="Activity" color="emerald" trend={12.5} />
        <StatCard label="Progression moyenne" value={`${avgProgress}%`} icon="TrendingUp" color="orange" trend={5.2} />
        <StatCard label="Épargne cumulée" value={`${(totalSavings / 1000).toFixed(0)}K F`} icon="PiggyBank" color="purple" trend={18.3} />
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un élève..."
          className="input-field pl-12"
        />
      </div>

      {/* Students table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="section-title">Liste des élèves</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-5 py-3">Élève</th>
                <th className="px-5 py-3 hidden sm:table-cell">Ville</th>
                <th className="px-5 py-3">Progrès</th>
                <th className="px-5 py-3 hidden lg:table-cell">Épargne</th>
                <th className="px-5 py-3 hidden sm:table-cell">Statut</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${s.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.age} ans</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-sm text-slate-600 flex items-center gap-1"><Icon name="MapPin" size={14} className="text-slate-400" /> {s.city}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <ProgressBar value={s.progress} color="emerald" size="sm" />
                      <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-slate-900">{new Intl.NumberFormat('fr-FR').format(s.savingsTotal)} F</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`badge ${
                      s.status === 'active' ? 'badge-green' : s.status === 'idle' ? 'badge-orange' : 'badge-gray'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        s.status === 'active' ? 'bg-emerald-500' : s.status === 'idle' ? 'bg-orange-500' : 'bg-slate-400'
                      }`} />
                      {s.status === 'active' ? 'Actif' : s.status === 'idle' ? 'Inactif' : 'Absent'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => setSelectedStudent(s.id)} className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student detail modal */}
      {student && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setSelectedStudent(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative card max-w-lg w-full p-6 slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">Profil de l'élève</h3>
              <button onClick={() => setSelectedStudent(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-3xl ${student.avatarColor} flex items-center justify-center text-white text-2xl font-bold`}>
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{student.name}</p>
                <p className="text-sm text-slate-500">{student.age} ans · {student.city}</p>
                <span className={`badge mt-1 ${student.status === 'active' ? 'badge-green' : student.status === 'idle' ? 'badge-orange' : 'badge-gray'}`}>
                  {student.status === 'active' ? 'Actif' : student.status === 'idle' ? 'Inactif' : 'Absent'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="card p-3 text-center bg-blue-50 border-0">
                <p className="text-xl font-bold text-slate-900">{student.lessonsCompleted}</p>
                <p className="text-xs text-slate-500">Leçons</p>
              </div>
              <div className="card p-3 text-center bg-emerald-50 border-0">
                <p className="text-xl font-bold text-slate-900">{student.progress}%</p>
                <p className="text-xs text-slate-500">Progrès</p>
              </div>
              <div className="card p-3 text-center bg-orange-50 border-0">
                <p className="text-xl font-bold text-slate-900">{(student.savingsTotal / 1000).toFixed(0)}K</p>
                <p className="text-xs text-slate-500">Épargne (F)</p>
              </div>
            </div>

            <div className="card p-4 bg-slate-50 border-0 mb-5">
              <p className="text-xs text-slate-400 mb-1">Dernière activité</p>
              <p className="text-sm font-semibold text-slate-700">{student.lastActive}</p>
            </div>

            <div className="flex gap-3">
              <button className="btn-blue flex-1 py-2.5 text-sm">
                <Icon name="MessageCircle" size={18} />
                Envoyer un message
              </button>
              <button onClick={() => { setSelectedStudent(null); onNavigate('lessons'); }} className="btn-outline flex-1 py-2.5 text-sm">
                <Icon name="BookOpen" size={18} />
                Assigner leçon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
