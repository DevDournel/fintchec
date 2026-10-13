import { useState } from 'react';
import { Sidebar, MobileNav, TopBar } from '@/components/Layout';
import { Landing } from '@/screens/Landing';
import { Auth, Onboarding } from '@/screens/Auth';
import { Dashboard } from '@/screens/Dashboard';
import { Lessons, LessonDetail } from '@/screens/Lessons';
import { Savings } from '@/screens/Savings';
import { Budget } from '@/screens/Budget';
import { Profile, Achievements } from '@/screens/Profile';
import { MentorDashboard } from '@/screens/MentorDashboard';
import { AdminDashboard } from '@/screens/AdminDashboard';
import type { ScreenName, UserRole } from '@/types';

function App() {
  const [screen, setScreen] = useState<ScreenName>('landing');
  const [role, setRole] = useState<UserRole>('young');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>();

  const handleAuth = (newRole: UserRole, name: string) => {
    setRole(newRole);
    setUserName(name);
    setIsAuthenticated(true);
    setShowOnboarding(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setScreen('landing');
    setUserName('');
  };

  const handleNavigate = (target: ScreenName, lessonId?: string) => {
    if (lessonId) setSelectedLessonId(lessonId);
    setScreen(target);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    if (role === 'mentor') setScreen('mentor-dashboard');
    else if (role === 'admin') setScreen('admin-dashboard');
    else setScreen('dashboard');
  };

  // Unauthenticated screens
  if (!isAuthenticated) {
    if (screen === 'signin' || screen === 'signup') {
      return <Auth mode={screen} onNavigate={handleNavigate} onAuth={handleAuth} />;
    }
    return <Landing onNavigate={handleNavigate} />;
  }

  // Onboarding flow
  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} userName={userName} />;
  }

  // Authenticated screens
  const showSidebar = role === 'young' || role === 'mentor' || role === 'admin';

  const screenTitles: Record<string, { title: string; subtitle?: string }> = {
    dashboard: { title: 'Tableau de bord', subtitle: 'Vue d\'ensemble de ton parcours financier' },
    lessons: { title: 'Leçons', subtitle: 'Apprends à ton rythme' },
    'lesson-detail': { title: 'Détail de la leçon', subtitle: 'Continue ton apprentissage' },
    savings: { title: 'Épargne', subtitle: 'Fixe et suis tes objectifs' },
    budget: { title: 'Budget', subtitle: 'Planifie tes dépenses mensuelles' },
    profile: { title: 'Profil', subtitle: 'Gère ton compte' },
    achievements: { title: 'Achievements', subtitle: 'Tes badges et récompenses' },
    'mentor-dashboard': { title: 'Mes élèves', subtitle: 'Suivi et accompagnement' },
    'admin-dashboard': { title: 'Administration', subtitle: 'Vue d\'ensemble de la plateforme' },
  };

  const titleInfo = screenTitles[screen] || { title: 'FinÉduq' };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard userName={userName} onNavigate={handleNavigate} />;
      case 'lessons':
        return <Lessons onNavigate={handleNavigate} />;
      case 'lesson-detail':
        return <LessonDetail lessonId={selectedLessonId || 'l1'} onNavigate={handleNavigate} />;
      case 'savings':
        return <Savings onNavigate={handleNavigate} />;
      case 'budget':
        return <Budget onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile userName={userName} role={role} onNavigate={handleNavigate} onSignOut={handleSignOut} />;
      case 'achievements':
        return <Achievements onNavigate={handleNavigate} />;
      case 'mentor-dashboard':
        return <MentorDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <Dashboard userName={userName} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {showSidebar && <Sidebar current={screen} onNavigate={handleNavigate} role={role} />}
      <div className="flex-1 min-w-0">
        <TopBar
          title={titleInfo.title}
          subtitle={titleInfo.subtitle}
          userName={userName}
          userRole={role}
          onNavigate={handleNavigate}
          onSignOut={handleSignOut}
        />
        <main className="fade-in">
          {renderScreen()}
        </main>
      </div>
      <MobileNav current={screen} onNavigate={handleNavigate} role={role} />
    </div>
  );
}

export default App;
