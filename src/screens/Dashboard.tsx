import { Icon } from '@/components/Icon';
import { ProgressBar, Sparkline, StatCard } from '@/components/ui';
import { lessons, recentActivities, savingsGoals, formatFCFA } from '@/data';
import type { ScreenName } from '@/types';

type DashboardProps = {
  userName: string;
  onNavigate: (screen: ScreenName, lessonId?: string) => void;
};

export function Dashboard({ userName, onNavigate }: DashboardProps) {
  const inProgressLessons = lessons.filter((l) => l.progress > 0 && !l.completed);
  const recommendedLessons = lessons.filter((l) => l.progress === 0 && !l.locked).slice(0, 3);
  const totalSavings = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const completedCount = lessons.filter((l) => l.completed).length;

  const sparkData = [12, 18, 15, 22, 28, 25, 35, 42, 38, 45, 50, 48];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Welcome banner */}
      <div className="card p-6 bg-gradient-to-r from-blue-600 to-blue-800 border-0 relative overflow-hidden fade-in">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm">Content de te revoir,</p>
            <h2 className="text-2xl font-bold text-white">{userName}!</h2>
            <p className="text-blue-100 text-sm mt-2">Tu as complété {completedCount} leçon{completedCount > 1 ? 's' : ''}. Continue ton élan!</p>
          </div>
          <button onClick={() => onNavigate('lessons')} className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-md whitespace-nowrap">
            Continuer à apprendre
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Épargne totale" value={formatFCFA(totalSavings).replace(' FCFA', ' F')} icon="PiggyBank" color="emerald" trend={15.2} trendLabel="vs mois dernier" />
        <StatCard label="Leçons complétées" value={`${completedCount}/${lessons.length}`} icon="BookOpen" color="blue" trend={8.3} trendLabel="ce mois" />
        <StatCard label="Objectifs actifs" value={`${savingsGoals.length}`} icon="Target" color="orange" />
        <StatCard label="Badges débloqués" value="3/8" icon="Award" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Savings overview */}
        <div className="lg:col-span-2 card p-6 slide-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="section-title">Évolution de l'épargne</h3>
              <p className="text-sm text-slate-500 mt-0.5">12 derniers mois</p>
            </div>
            <button onClick={() => onNavigate('savings')} className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Voir tout <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div>
              <p className="text-3xl font-bold text-slate-900">{formatFCFA(totalSavings)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-green"><Icon name="TrendingUp" size={12} /> +15.2%</span>
                <span className="text-xs text-slate-400">vs mois dernier</span>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Sparkline data={sparkData} width={600} height={120} color="#3b82f6" />
          </div>
        </div>

        {/* Activity feed */}
        <div className="card p-6 slide-up">
          <h3 className="section-title mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon name={act.icon} size={18} className="text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{act.title}</p>
                  <p className="text-xs text-slate-500 truncate">{act.description}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{act.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue learning */}
      {inProgressLessons.length > 0 && (
        <div className="slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Continuer l'apprentissage</h3>
            <button onClick={() => onNavigate('lessons')} className="text-sm text-blue-600 font-semibold hover:underline">Tout voir</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onNavigate('lesson-detail', lesson.id)}
                className="card-hover p-5 text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon name="BookOpen" size={20} className="text-blue-600" />
                  </div>
                  <span className="badge-orange">{lesson.progress}%</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">{lesson.title}</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{lesson.description}</p>
                <ProgressBar value={lesson.progress} color="blue" size="sm" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommended */}
      <div className="slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Recommandé pour toi</h3>
          <button onClick={() => onNavigate('lessons')} className="text-sm text-blue-600 font-semibold hover:underline">Tout voir</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onNavigate('lesson-detail', lesson.id)}
              className="card-hover p-5 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-emerald-600" />
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-orange-400 fill-orange-400" />
                  <span className="text-xs font-semibold text-slate-600">{lesson.rating}</span>
                </div>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">{lesson.title}</h4>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{lesson.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Icon name="Clock" size={12} /> {lesson.durationMinutes} min</span>
                <span className="flex items-center gap-1"><Icon name="Users" size={12} /> {lesson.studentsCount}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
