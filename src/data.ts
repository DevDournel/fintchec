import type {
  Lesson,
  SavingsGoal,
  BudgetCategory,
  Achievement,
  Activity,
  MentorStudent,
  AdminStat,
} from '@/types';

export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Comprendre l\'argent de base',
    description: 'Découvrez ce qu\'est l\'argent, sa valeur et comment il circule dans l\'économie.',
    category: 'basics',
    level: 'beginner',
    durationMinutes: 15,
    progress: 100,
    completed: true,
    locked: false,
    rating: 4.8,
    studentsCount: 1240,
    modules: [
      { id: 'm1', title: 'Qu\'est-ce que l\'argent?', type: 'video', completed: true },
      { id: 'm2', title: 'La valeur de l\'argent', type: 'reading', completed: true },
      { id: 'm3', title: 'L\'argent dans la vie quotidienne', type: 'quiz', completed: true },
    ],
  },
  {
    id: 'l2',
    title: 'Créer son premier budget',
    description: 'Apprenez à planifier vos dépenses et à équilibrer vos revenus et vos charges.',
    category: 'budgeting',
    level: 'beginner',
    durationMinutes: 20,
    progress: 60,
    completed: false,
    locked: false,
    rating: 4.9,
    studentsCount: 980,
    modules: [
      { id: 'm1', title: 'Pourquoi budgéter?', type: 'video', completed: true },
      { id: 'm2', title: 'Les catégories de dépenses', type: 'reading', completed: true },
      { id: 'm3', title: 'Créer votre budget', type: 'exercise', completed: false },
      { id: 'm4', title: 'Quiz: Le budget', type: 'quiz', completed: false },
    ],
  },
  {
    id: 'l3',
    title: 'L\'art d\'épargner',
    description: 'Comprenez pourquoi épargner est essentiel et découvrez des stratégies pratiques.',
    category: 'saving',
    level: 'beginner',
    durationMinutes: 18,
    progress: 0,
    completed: false,
    locked: false,
    rating: 4.7,
    studentsCount: 850,
    modules: [
      { id: 'm1', title: 'Pourquoi épargner?', type: 'video', completed: false },
      { id: 'm2', title: 'Combien épargner?', type: 'reading', completed: false },
      { id: 'm3', title: 'Stratégies d\'épargne', type: 'exercise', completed: false },
    ],
  },
  {
    id: 'l4',
    title: 'Les moyens de paiement numériques',
    description: 'Mobile Money, cartes bancaires, virements: utilisez-les en toute sécurité.',
    category: 'payment',
    level: 'intermediate',
    durationMinutes: 25,
    progress: 0,
    completed: false,
    locked: false,
    rating: 4.6,
    studentsCount: 720,
    modules: [
      { id: 'm1', title: 'Mobile Money en Côte d\'Ivoire', type: 'video', completed: false },
      { id: 'm2', title: 'Sécurité des transactions', type: 'reading', completed: false },
      { id: 'm3', title: 'Quiz: Paiement sécurisé', type: 'quiz', completed: false },
    ],
  },
  {
    id: 'l5',
    title: 'Éviter le surendettement',
    description: 'Reconnaissez les pièges de la dette et apprenez à les éviter.',
    category: 'debt',
    level: 'intermediate',
    durationMinutes: 22,
    progress: 0,
    completed: false,
    locked: true,
    rating: 4.5,
    studentsCount: 510,
    modules: [
      { id: 'm1', title: 'Comprendre la dette', type: 'video', completed: false },
      { id: 'm2', title: 'Les pièges à éviter', type: 'reading', completed: false },
    ],
  },
  {
    id: 'l6',
    title: 'Premiers pas en investissement',
    description: 'Faites fructifier votre argent avec des notions de base en investissement.',
    category: 'investing',
    level: 'advanced',
    durationMinutes: 30,
    progress: 0,
    completed: false,
    locked: true,
    rating: 4.4,
    studentsCount: 340,
    modules: [
      { id: 'm1', title: 'L\'investissement expliqué', type: 'video', completed: false },
      { id: 'm2', title: 'Types d\'investissements', type: 'reading', completed: false },
      { id: 'm3', title: 'Exercice: Simuler un placement', type: 'exercise', completed: false },
    ],
  },
];

export const savingsGoals: SavingsGoal[] = [
  {
    id: 'g1',
    title: 'Nouvel ordinateur',
    icon: 'Laptop',
    targetAmount: 250000,
    currentAmount: 175000,
    deadline: '2026-12-31',
    color: 'blue',
  },
  {
    id: 'g2',
    title: 'Fonds d\'urgence',
    icon: 'ShieldCheck',
    targetAmount: 100000,
    currentAmount: 45000,
    deadline: '2027-06-30',
    color: 'emerald',
  },
  {
    id: 'g3',
    title: 'Formation en ligne',
    icon: 'GraduationCap',
    targetAmount: 80000,
    currentAmount: 60000,
    deadline: '2026-11-15',
    color: 'orange',
  },
  {
    id: 'g4',
    title: 'Projet entrepreneurial',
    icon: 'Rocket',
    targetAmount: 500000,
    currentAmount: 120000,
    deadline: '2027-12-31',
    color: 'purple',
  },
];

export const budgetCategories: BudgetCategory[] = [
  { id: 'b1', name: 'Alimentation', icon: 'Utensils', allocated: 30000, spent: 18500, color: 'orange' },
  { id: 'b2', name: 'Transport', icon: 'Bus', allocated: 15000, spent: 12000, color: 'blue' },
  { id: 'b3', name: 'Téléphone & Internet', icon: 'Smartphone', allocated: 10000, spent: 8500, color: 'purple' },
  { id: 'b4', name: 'Formation', icon: 'BookOpen', allocated: 20000, spent: 15000, color: 'emerald' },
  { id: 'b5', name: 'Loisirs', icon: 'Gamepad2', allocated: 8000, spent: 3200, color: 'pink' },
  { id: 'b6', name: 'Santé', icon: 'HeartPulse', allocated: 12000, spent: 2000, color: 'red' },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: 'Premier pas', description: 'Terminer votre première leçon', icon: 'Footprints', earned: true, date: '12 Sep 2026' },
  { id: 'a2', title: 'Économe', description: 'Atteindre 25 000 FCFA d\'épargne', icon: 'PiggyBank', earned: true, date: '25 Sep 2026' },
  { id: 'a3', title: 'Budgeteur', description: 'Créer votre premier budget', icon: 'ClipboardList', earned: true, date: '28 Sep 2026' },
  { id: 'a4', title: 'Apprenant', description: 'Compléter 5 leçons', icon: 'Brain', earned: false },
  { id: 'a5', title: 'Objectif atteint', description: 'Atteindre un objectif d\'épargne', icon: 'Target', earned: false },
  { id: 'a6', title: 'Série de 7 jours', description: 'Se connecter 7 jours de suite', icon: 'Flame', earned: false },
  { id: 'a7', title: 'Expert Mobile Money', description: 'Compléter le module paiement', icon: 'Smartphone', earned: false },
  { id: 'a8', title: 'Champion', description: 'Atteindre 100 000 FCFA d\'épargne', icon: 'Trophy', earned: false },
];

export const recentActivities: Activity[] = [
  { id: 'act1', type: 'lesson', title: 'Leçon complétée', description: 'Comprendre l\'argent de base', date: 'Il y a 2h', icon: 'CheckCircle2' },
  { id: 'act2', type: 'savings', title: 'Dépôt d\'épargne', description: '5 000 FCFA vers "Nouvel ordinateur"', date: 'Hier', icon: 'ArrowUpCircle' },
  { id: 'act3', type: 'achievement', title: 'Badge débloqué', description: 'Budgeteur', date: 'Il y a 2 jours', icon: 'Award' },
  { id: 'act4', type: 'lesson', title: 'Leçon commencée', description: 'Créer son premier budget', date: 'Il y a 3 jours', icon: 'PlayCircle' },
];

export const mentorStudents: MentorStudent[] = [
  { id: 's1', name: 'Aya Koné', age: 17, city: 'Abidjan', progress: 85, lessonsCompleted: 6, savingsTotal: 120000, lastActive: 'Il y a 1h', status: 'active', avatarColor: 'bg-blue-500' },
  { id: 's2', name: 'Mamadou Traoré', age: 19, city: 'Bouaké', progress: 60, lessonsCompleted: 4, savingsTotal: 55000, lastActive: 'Il y a 3h', status: 'active', avatarColor: 'bg-emerald-500' },
  { id: 's3', name: 'Fatou Diabaté', age: 16, city: 'Yamoussoukro', progress: 40, lessonsCompleted: 3, savingsTotal: 25000, lastActive: 'Hier', status: 'idle', avatarColor: 'bg-orange-500' },
  { id: 's4', name: 'Kouassi N\'Guessan', age: 18, city: 'Abidjan', progress: 95, lessonsCompleted: 7, savingsTotal: 200000, lastActive: 'Il y a 30 min', status: 'active', avatarColor: 'bg-purple-500' },
  { id: 's5', name: 'Aminata Cissé', age: 17, city: 'San-Pédro', progress: 20, lessonsCompleted: 1, savingsTotal: 5000, lastActive: 'Il y a 5 jours', status: 'inactive', avatarColor: 'bg-pink-500' },
  { id: 's6', name: 'Ibrahim Coulibaly', age: 20, city: 'Korhogo', progress: 70, lessonsCompleted: 5, savingsTotal: 80000, lastActive: 'Il y a 2h', status: 'active', avatarColor: 'bg-teal-500' },
];

export const adminStats: AdminStat[] = [
  { id: 'st1', label: 'Utilisateurs actifs', value: 3485, change: 12.5, icon: 'Users', color: 'blue' },
  { id: 'st2', label: 'Leçons complétées', value: 18230, change: 8.3, icon: 'BookOpen', color: 'emerald' },
  { id: 'st3', label: 'Épargne totale (FCFA)', value: 45200000, change: 15.2, icon: 'PiggyBank', color: 'orange' },
  { id: 'st4', label: 'Taux de complétion', value: 74, change: 3.7, icon: 'TrendingUp', color: 'purple' },
];

export const categoryLabels: Record<string, string> = {
  basics: 'Bases',
  budgeting: 'Budget',
  saving: 'Épargne',
  payment: 'Paiement',
  investing: 'Investissement',
  debt: 'Dette',
};

export const levelLabels: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}
