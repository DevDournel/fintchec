import { Icon } from './Icon';
import type { ScreenName, UserRole } from '@/types';

type SidebarProps = {
  current: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  role: UserRole;
};

const youngNav: { screen: ScreenName; label: string; icon: string }[] = [
  { screen: 'dashboard', label: 'Tableau de bord', icon: 'LayoutDashboard' },
  { screen: 'lessons', label: 'Leçons', icon: 'BookOpen' },
  { screen: 'savings', label: 'Épargne', icon: 'PiggyBank' },
  { screen: 'budget', label: 'Budget', icon: 'Wallet' },
  { screen: 'achievements', label: 'Achievements', icon: 'Award' },
  { screen: 'profile', label: 'Profil', icon: 'User' },
];

const mentorNav: { screen: ScreenName; label: string; icon: string }[] = [
  { screen: 'mentor-dashboard', label: 'Mes élèves', icon: 'Users' },
  { screen: 'lessons', label: 'Bibliothèque', icon: 'BookOpen' },
  { screen: 'profile', label: 'Profil', icon: 'User' },
];

const adminNav: { screen: ScreenName; label: string; icon: string }[] = [
  { screen: 'admin-dashboard', label: 'Vue d\'ensemble', icon: 'BarChart3' },
  { screen: 'lessons', label: 'Contenu', icon: 'BookOpen' },
  { screen: 'profile', label: 'Profil', icon: 'User' },
];

export function Sidebar({ current, onNavigate, role }: SidebarProps) {
  const nav = role === 'mentor' ? mentorNav : role === 'admin' ? adminNav : youngNav;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 shrink-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
          <Icon name="GraduationCap" size={22} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">FinÉduq</p>
          <p className="text-xs text-slate-400">Éducation financière</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <p className="px-3.5 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">Menu</p>
        <div className="space-y-1">
          {nav.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`sidebar-link w-full ${current === item.screen || (current === 'lesson-detail' && item.screen === 'lessons') ? 'sidebar-link-active' : ''}`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div className="card p-3 bg-gradient-to-br from-blue-50 to-emerald-50 border-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Sparkles" size={16} className="text-orange-500" />
            <p className="text-sm font-semibold text-slate-700">Astuce du jour</p>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">Épargnez au moins 10% de chaque rentrée d'argent, même petit!</p>
        </div>
      </div>
    </aside>
  );
}

type MobileNavProps = {
  current: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  role: UserRole;
};

export function MobileNav({ current, onNavigate, role }: MobileNavProps) {
  let nav: { screen: ScreenName; label: string; icon: string }[];
  if (role === 'mentor') {
    nav = [
      { screen: 'mentor-dashboard', label: 'Élèves', icon: 'Users' },
      { screen: 'lessons', label: 'Leçons', icon: 'BookOpen' },
      { screen: 'profile', label: 'Profil', icon: 'User' },
    ];
  } else if (role === 'admin') {
    nav = [
      { screen: 'admin-dashboard', label: 'Stats', icon: 'BarChart3' },
      { screen: 'lessons', label: 'Contenu', icon: 'BookOpen' },
      { screen: 'profile', label: 'Profil', icon: 'User' },
    ];
  } else {
    nav = [
      { screen: 'dashboard', label: 'Accueil', icon: 'Home' },
      { screen: 'lessons', label: 'Leçons', icon: 'BookOpen' },
      { screen: 'savings', label: 'Épargne', icon: 'PiggyBank' },
      { screen: 'budget', label: 'Budget', icon: 'Wallet' },
      { screen: 'profile', label: 'Profil', icon: 'User' },
    ];
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-40 safe-area">
      <div className="flex items-center justify-around px-2 py-2">
        {nav.map((item) => {
          const active = current === item.screen || (current === 'lesson-detail' && item.screen === 'lessons');
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${active ? 'text-blue-600' : 'text-slate-400'}`}
            >
              <Icon name={item.icon} size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

type TopBarProps = {
  title: string;
  subtitle?: string;
  userName: string;
  userRole: UserRole;
  onNavigate: (screen: ScreenName) => void;
  onSignOut: () => void;
};

export function TopBar({ title, subtitle, userName, userRole, onNavigate, onSignOut }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors relative">
            <Icon name="Bell" size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${userRole === 'mentor' ? 'bg-emerald-600' : userRole === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                {userName.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900 leading-tight">{userName}</p>
                <p className="text-xs text-slate-400 capitalize">
                  {userRole === 'young' ? 'Bénéficiaire' : userRole === 'mentor' ? 'Mentor' : 'Administrateur'}
                </p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-slate-400 hidden sm:block" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 card p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button onClick={() => onNavigate('profile')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                <Icon name="User" size={18} /> Mon profil
              </button>
              <button onClick={() => onNavigate('achievements')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                <Icon name="Award" size={18} /> Mes achievements
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button onClick={onSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                <Icon name="LogOut" size={18} /> Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
