import { useState } from 'react';
import { Icon } from '@/components/Icon';
import type { ScreenName, UserRole } from '@/types';

type AuthProps = {
  mode: 'signin' | 'signup';
  onNavigate: (screen: ScreenName) => void;
  onAuth: (role: UserRole, name: string) => void;
};

export function Auth({ mode, onNavigate, onAuth }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('young');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = mode === 'signin' ? 'Aya Koné' : name || 'Nouveau utilisateur';
    onAuth(role, userName);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Icon name="GraduationCap" size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">FinÉduq</p>
              <p className="text-xs text-blue-200">Éducation financière</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Ton avenir financier commence ici
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed max-w-md">
              Apprends, épargne, et prends les bonnes décisions pour ton argent. C'est gratuit, simple et adapté à toi.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: 'BookOpen', text: 'Plus de 20 leçons interactives' },
                { icon: 'PiggyBank', text: 'Fixe et suis tes objectifs d\'épargne' },
                { icon: 'Award', text: 'Gagne des badges en progressant' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <span className="text-blue-100">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold">3 485+</p>
              <p className="text-sm text-blue-200">Jeunes inscrits</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-bold">18 230</p>
              <p className="text-sm text-blue-200">Leçons complétées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex items-center gap-3 p-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <Icon name="GraduationCap" size={22} className="text-white" />
          </div>
          <p className="font-bold text-slate-900">FinÉduq</p>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <button onClick={() => onNavigate('landing')} className="btn-ghost px-3 py-1.5 text-sm mb-6">
              <Icon name="ArrowLeft" size={18} />
              Retour
            </button>

            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              {mode === 'signin' ? 'Bon retour!' : 'Crée ton compte'}
            </h1>
            <p className="text-slate-500 mb-8">
              {mode === 'signin' ? 'Connecte-toi pour continuer ton parcours' : 'C\'est gratuit, ça prend 2 minutes'}
            </p>

            {mode === 'signup' && (
              <div className="mb-5">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Je suis un(e)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'young' as const, label: 'Jeune', icon: 'User' },
                    { value: 'mentor' as const, label: 'Mentor', icon: 'Users' },
                    { value: 'admin' as const, label: 'Admin', icon: 'Settings' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                        role === opt.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <Icon name={opt.icon} size={20} />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Nom complet</label>
                  <div className="relative">
                    <Icon name="User" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aya Koné"
                      className="input-field pl-11"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Adresse email</label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aya.koné@email.com"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Mot de passe</label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>

              {mode === 'signin' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    Se souvenir de moi
                  </label>
                  <a href="#" className="text-blue-600 hover:underline font-medium">Mot de passe oublié?</a>
                </div>
              )}

              <button type="submit" className="btn-primary w-full py-3.5 text-base mt-2">
                {mode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
                <Icon name="ArrowRight" size={20} />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">OU</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button onClick={() => onAuth(role, mode === 'signin' ? 'Aya Koné' : 'Nouvel utilisateur')} className="btn-outline w-full py-3">
              <Icon name="Smartphone" size={20} />
              Continuer avec Mobile Money
            </button>

            <p className="text-center text-sm text-slate-500 mt-6">
              {mode === 'signin' ? "Pas encore de compte? " : 'Déjà inscrit? '}
              <button
                onClick={() => onNavigate(mode === 'signin' ? 'signup' : 'signin')}
                className="text-blue-600 hover:underline font-semibold"
              >
                {mode === 'signin' ? 'Créer un compte' : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type OnboardingProps = {
  onComplete: () => void;
  userName: string;
};

export function Onboarding({ onComplete, userName }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);

  const steps = [
    {
      icon: 'Hand',
      title: `Bienvenue ${userName}!`,
      desc: 'Nous sommes ravis de t\'accueillir sur FinÉduq. Ensemble, construisons ton avenir financier étape par étape.',
    },
    {
      icon: 'Target',
      title: 'Quels sont tes objectifs?',
      desc: 'Choisis ce que tu veux accomplir. Nous personnaliserons ton parcours.',
      options: [
        { id: 'save', label: 'Apprendre à épargner', icon: 'PiggyBank' },
        { id: 'budget', label: 'Créer un budget', icon: 'Wallet' },
        { id: 'mobile', label: 'Maîtriser Mobile Money', icon: 'Smartphone' },
        { id: 'invest', label: 'Comprendre l\'investissement', icon: 'TrendingUp' },
      ],
    },
    {
      icon: 'Rocket',
      title: 'Tu es prêt!',
      desc: 'Ton parcours est personnalisé. Commence ta première leçon dès maintenant!',
    },
  ];

  const current = steps[step];

  const toggleGoal = (id: string) => {
    setGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="card max-w-lg w-full p-8 slide-up">
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
          ))}
        </div>

        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-6">
          <Icon name={current.icon} size={36} className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">{current.title}</h2>
        <p className="text-slate-500 text-center mb-6 leading-relaxed">{current.desc}</p>

        {step === 1 && current.options && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleGoal(opt.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  goals.includes(opt.id) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon name={opt.icon} size={24} className={goals.includes(opt.id) ? 'text-blue-600' : 'text-slate-400'} />
                <span className="text-sm font-medium text-slate-700 text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => (step < 2 ? setStep(step + 1) : onComplete())}
          className="btn-primary w-full py-3.5 text-base"
        >
          {step < 2 ? 'Continuer' : 'Commencer mon parcours'}
          <Icon name={step < 2 ? 'ArrowRight' : 'Rocket'} size={20} />
        </button>

        {step === 0 && (
          <button onClick={onComplete} className="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-3">
            Passer l'introduction
          </button>
        )}
      </div>
    </div>
  );
}
