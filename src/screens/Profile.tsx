import { Icon } from '@/components/Icon';
import { achievements, recentActivities } from '@/data';
import type { ScreenName, UserRole } from '@/types';

type ProfileProps = {
  userName: string;
  role: UserRole;
  onNavigate: (screen: ScreenName) => void;
  onSignOut: () => void;
};

export function Profile({ userName, role, onNavigate, onSignOut }: ProfileProps) {
  const earnedBadges = achievements.filter((a) => a.earned);
  const roleLabel = role === 'young' ? 'Jeune bénéficiaire' : role === 'mentor' ? 'Mentor' : 'Administrateur';
  const roleColor = role === 'young' ? 'blue' : role === 'mentor' ? 'emerald' : 'purple';

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto pb-24 lg:pb-8">
      {/* Profile header */}
      <div className="card overflow-hidden fade-in">
        <div className={`h-32 bg-gradient-to-r from-${roleColor}-600 to-${roleColor}-800`} />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className={`w-24 h-24 rounded-3xl bg-${roleColor}-600 border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg`}>
              {userName.charAt(0)}
            </div>
            <button onClick={() => onNavigate('achievements')} className="btn-outline px-4 py-2 text-sm">
              <Icon name="Award" size={18} />
              Mes badges
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{userName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`badge bg-${roleColor}-50 text-${roleColor}-700 capitalize`}>{roleLabel}</span>
            <span className="badge-gray"><Icon name="MapPin" size={12} /> Abidjan, Côte d'Ivoire</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Points', value: '1 250', icon: 'Star', color: 'orange' },
          { label: 'Leçons', value: '6/20', icon: 'BookOpen', color: 'blue' },
          { label: 'Épargne', value: '280K F', icon: 'PiggyBank', color: 'emerald' },
          { label: 'Badges', value: `${earnedBadges.length}/8`, icon: 'Award', color: 'purple' },
        ].map((s, i) => (
          <div key={i} className="card p-5 slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={20} className={`text-${s.color}-600`} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="card p-6 slide-up">
          <h3 className="section-title mb-4">Paramètres</h3>
          <div className="space-y-2">
            {[
              { icon: 'User', label: 'Informations personnelles', desc: 'Nom, email, photo' },
              { icon: 'Bell', label: 'Notifications', desc: 'Alertes et rappels' },
              { icon: 'Lock', label: 'Sécurité', desc: 'Mot de passe, confidentialité' },
              { icon: 'Globe', label: 'Langue', desc: 'Français' },
              { icon: 'HelpCircle', label: 'Aide & support', desc: 'FAQ, contacter l\'équipe' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <Icon name="ChevronRight" size={18} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Activity history */}
        <div className="card p-6 slide-up">
          <h3 className="section-title mb-4">Historique d'activité</h3>
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon name={act.icon} size={18} className="text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{act.title}</p>
                  <p className="text-xs text-slate-500">{act.description}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{act.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button onClick={onSignOut} className="btn-outline w-full py-3 text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50">
        <Icon name="LogOut" size={20} />
        Se déconnecter
      </button>
    </div>
  );
}

type AchievementsProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function Achievements({ onNavigate }: AchievementsProps) {
  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-purple-600 to-purple-800 border-0 fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Icon name="Award" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Mes achievements</h2>
            <p className="text-purple-100 text-sm mt-1">{earned.length} badges débloqués sur {achievements.length}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card p-6 slide-up">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-slate-900">Progression totale</p>
          <span className="text-2xl font-bold text-purple-600">{Math.round((earned.length / achievements.length) * 100)}%</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-700" style={{ width: `${(earned.length / achievements.length) * 100}%` }} />
        </div>
      </div>

      {/* Earned badges */}
      <div>
        <h3 className="section-title mb-4">Badges débloqués</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {earned.map((badge, i) => (
            <div key={badge.id} className="card-hover p-5 text-center slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Icon name={badge.icon} size={32} className="text-white" />
              </div>
              <p className="font-bold text-slate-900 text-sm">{badge.title}</p>
              <p className="text-xs text-slate-500 mt-1">{badge.description}</p>
              <p className="text-xs text-slate-400 mt-2">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked badges */}
      <div>
        <h3 className="section-title mb-4">À débloquer</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {locked.map((badge, i) => (
            <div key={badge.id} className="card p-5 text-center opacity-70" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="Lock" size={28} className="text-slate-400" />
              </div>
              <p className="font-bold text-slate-600 text-sm">{badge.title}</p>
              <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => onNavigate('dashboard')} className="btn-ghost px-4 py-2 text-sm">
        <Icon name="ArrowLeft" size={18} />
        Retour
      </button>
    </div>
  );
}
