export type UserRole = 'young' | 'mentor' | 'admin';

export type ScreenName =
  | 'landing'
  | 'signin'
  | 'signup'
  | 'onboarding'
  | 'dashboard'
  | 'lessons'
  | 'lesson-detail'
  | 'savings'
  | 'budget'
  | 'profile'
  | 'achievements'
  | 'mentor-dashboard'
  | 'admin-dashboard';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'budgeting' | 'saving' | 'payment' | 'investing' | 'debt' | 'basics';
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  progress: number;
  completed: boolean;
  locked: boolean;
  modules: LessonModule[];
  rating: number;
  studentsCount: number;
}

export interface LessonModule {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'reading' | 'exercise';
  completed: boolean;
}

export interface SavingsGoal {
  id: string;
  title: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

export interface Activity {
  id: string;
  type: 'lesson' | 'savings' | 'budget' | 'achievement';
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface MentorStudent {
  id: string;
  name: string;
  age: number;
  city: string;
  progress: number;
  lessonsCompleted: number;
  savingsTotal: number;
  lastActive: string;
  status: 'active' | 'idle' | 'inactive';
  avatarColor: string;
}

export interface AdminStat {
  id: string;
  label: string;
  value: number;
  change: number;
  icon: string;
  color: string;
}
