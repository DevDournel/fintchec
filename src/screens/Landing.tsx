import { Icon } from '@/components/Icon';
import type { ScreenName } from '@/types';

type LandingProps = {
  onNavigate: (screen: ScreenName) => void;
};

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <Icon name="GraduationCap" size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">FinÉduq</p>
              <p className="text-[10px] text-slate-400 hidden sm:block">Éducation financière pour la jeunesse</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('signin')} className="btn-ghost px-4 py-2 text-sm">
              Se connecter
            </button>
            <button onClick={() => onNavigate('signup')} className="btn-primary px-5 py-2 text-sm">
              Commencer
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <div className="badge-blue mb-5 w-fit">
                <Icon name="Sparkles" size={14} />
                <span>Disponible en Côte d'Ivoire</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Apprends à gérer ton argent <span className="text-blue-600">comme un pro</span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl">
                Une plateforme gratuite et pédagogique pour les jeunes ivoiriens. Épargne, budget, Mobile Money, investissement — tout pour construire ton avenir financier.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={() => onNavigate('signup')} className="btn-primary px-7 py-3.5 text-base">
                  Créer mon compte gratuit
                  <Icon name="ArrowRight" size={20} />
                </button>
                <button onClick={() => onNavigate('signin')} className="btn-outline px-7 py-3.5 text-base">
                  <Icon name="PlayCircle" size={20} />
                  Voir la démo
                </button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {['bg-blue-500', 'bg-emerald-500', 'bg-orange-500', 'bg-purple-500'].map((c, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {['A', 'M', 'F', 'K'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">3 485+ jeunes inscrits</p>
                  <div className="flex items-center gap-1">
                    {Array(5).fill(0).map((_, i) => <Icon key={i} name="Star" size={14} className="text-orange-400 fill-orange-400" />)}
                    <span className="text-xs text-slate-500 ml-1">4.8/5 satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero visual card */}
            <div className="relative slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="card p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm text-slate-500">Mon épargne totale</p>
                    <p className="text-3xl font-bold text-slate-900">280 000 <span className="text-lg text-slate-400">FCFA</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Icon name="PiggyBank" size={24} className="text-emerald-600" />
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600">Nouvel ordinateur</span>
                      <span className="font-semibold text-slate-900">70%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600">Fonds d'urgence</span>
                      <span className="font-semibold text-slate-900">45%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600">Formation en ligne</span>
                      <span className="font-semibold text-slate-900">75%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 card p-3 bg-blue-50 border-0">
                    <Icon name="BookOpen" size={18} className="text-blue-600" />
                    <p className="text-lg font-bold text-slate-900 mt-1">6</p>
                    <p className="text-xs text-slate-500">Leçons faites</p>
                  </div>
                  <div className="flex-1 card p-3 bg-orange-50 border-0">
                    <Icon name="Flame" size={18} className="text-orange-600" />
                    <p className="text-lg font-bold text-slate-900 mt-1">5</p>
                    <p className="text-xs text-slate-500">Jours de suite</p>
                  </div>
                  <div className="flex-1 card p-3 bg-emerald-50 border-0">
                    <Icon name="Award" size={18} className="text-emerald-600" />
                    <p className="text-lg font-bold text-slate-900 mt-1">3</p>
                    <p className="text-xs text-slate-500">Badges</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-2 card px-3 py-2 shadow-lg fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Icon name="TrendingUp" size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Objectif</p>
                    <p className="text-sm font-bold text-slate-900">+15% ce mois</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-2 card px-3 py-2 shadow-lg fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Badge débloqué</p>
                    <p className="text-sm font-bold text-slate-900">Budgeteur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-orange mb-4 w-fit mx-auto">
              <Icon name="Layers" size={14} />
              <span>Fonctionnalités</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Tout ce qu'il te faut pour réussir</h2>
            <p className="mt-3 text-slate-600">Des outils pratiques et des leçons interactives adaptées aux réalités de la Côte d'Ivoire</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'BookOpen', color: 'blue', title: 'Leçons interactives', desc: 'Videos, quizzes et exercices pour apprendre à ton rythme' },
              { icon: 'PiggyBank', color: 'emerald', title: 'Suivi d\'épargne', desc: 'Fixe des objectifs et visualise tes progrès en temps réel' },
              { icon: 'Wallet', color: 'orange', title: 'Planificateur de budget', desc: 'Répartis tes dépenses et garde le contrôle' },
              { icon: 'Smartphone', color: 'purple', title: 'Mobile Money', desc: 'Maîtrise les paiements numériques en sécurité' },
            ].map((f, i) => (
              <div key={i} className="card-hover p-6 slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-xl bg-${f.color}-50 flex items-center justify-center mb-4`}>
                  <Icon name={f.icon} size={24} className={`text-${f.color}-600`} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-green mb-4 w-fit mx-auto">
              <Icon name="Route" size={14} />
              <span>Comment ça marche</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Démarre en 3 étapes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', icon: 'UserPlus', color: 'blue', title: 'Crée ton compte', desc: 'Inscription gratuite en 2 minutes. Choisis ton profil: jeune, mentor ou administrateur.' },
              { num: '2', icon: 'BookOpen', color: 'emerald', title: 'Apprends à ton rythme', desc: 'Suis des leçons courtes et interactives. Gagne des badges à chaque étape.' },
              { num: '3', icon: 'TrendingUp', color: 'orange', title: 'Mets en pratique', desc: 'Crée ton budget, épargne, suis tes objectifs. Deviens autonome financièrement.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="card p-7 slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-${s.color}-600 text-white font-bold flex items-center justify-center`}>
                      {s.num}
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 flex items-center justify-center`}>
                      <Icon name={s.icon} size={20} className={`text-${s.color}-600`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 h-8 bg-white rounded-full border border-slate-100 items-center justify-center shadow-sm">
                    <Icon name="ChevronRight" size={18} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-blue mb-4 w-fit mx-auto">
              <Icon name="Users" size={14} />
              <span>Pour qui?</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Une plateforme pour chaque profil</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'User', color: 'blue', title: 'Jeune bénéficiaire', desc: 'Apprends la gestion financière de façon ludique. Leçons courtes, exercises pratiques, suivi d\'épargne et badges.', points: ['Leçons interactives', 'Suivi d\'épargne', 'Planificateur de budget'] },
              { icon: 'Users', color: 'emerald', title: 'Mentor', desc: 'Accompagne plusieurs jeunes, suis leur progression et interagis avec eux.', points: ['Tableau de suivi', 'Vue d\'ensemble', 'Accompagnement'] },
              { icon: 'Settings', color: 'purple', title: 'Administrateur', desc: 'Gère la plateforme, le contenu et accède aux statistiques globales.', points: ['Statistiques', 'Gestion de contenu', 'Vue d\'ensemble'] },
            ].map((p, i) => (
              <div key={i} className="card-hover p-7 slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-14 h-14 rounded-2xl bg-${p.color}-50 flex items-center justify-center mb-5`}>
                  <Icon name={p.icon} size={28} className={`text-${p.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-2">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <Icon name="Check" size={16} className={`text-${p.color}-600`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '3 485+', label: 'Jeunes inscrits' },
              { value: '18 230', label: 'Leçons complétées' },
              { value: '45M FCFA', label: 'Épargne cumulée' },
              { value: '74%', label: 'Taux de complétion' },
            ].map((s, i) => (
              <div key={i} className="slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-3xl lg:text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-blue-200 mt-1 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-orange mb-4 w-fit mx-auto">
              <Icon name="MessageCircle" size={14} />
              <span>Témoignages</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Ce que disent nos jeunes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Aya K.', age: 17, city: 'Abidjan', text: 'Grâce à FinÉduq, j\'ai pu économiser pour mon premier ordinateur. Les leçons sont simples et m\'ont beaucoup aidée!', color: 'bg-blue-500' },
              { name: 'Mamadou T.', age: 19, city: 'Bouaké', text: 'Je comprenais rien au budget avant. Maintenant je gère mon argent de poche comme un chef.', color: 'bg-emerald-500' },
              { name: 'Fatou D.', age: 16, city: 'Yamoussoukro', text: 'Le module sur Mobile Money m\'a appris à sécuriser mes transactions. Très utile!', color: 'bg-orange-500' },
            ].map((t, i) => (
              <div key={i} className="card p-6 slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-1 mb-3">
                  {Array(5).fill(0).map((_, j) => <Icon key={j} name="Star" size={16} className="text-orange-400 fill-orange-400" />)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}, {t.age} ans</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="card p-10 lg:p-14 bg-gradient-to-br from-blue-600 to-blue-800 border-0 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Prêt à prendre le contrôle de ton argent?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Rejoins des milliers de jeunes qui construisent leur avenir financier avec FinÉduq.</p>
              <button onClick={() => onNavigate('signup')} className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2">
                Créer mon compte gratuit
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Icon name="GraduationCap" size={18} className="text-white" />
                </div>
                <p className="font-bold text-white">FinÉduq</p>
              </div>
              <p className="text-sm text-slate-400">Éducation financière pour les jeunes de Côte d'Ivoire.</p>
            </div>
            {[
              { title: 'Produit', links: ['Leçons', 'Épargne', 'Budget', 'Mobile Money'] },
              { title: 'Ressources', links: ['Guide débutant', 'Blog', 'FAQ', 'Support'] },
              { title: 'À propos', links: ['Notre mission', 'Partenaires', 'Contact', 'Mentions légales'] },
            ].map((col, i) => (
              <div key={i}>
                <p className="font-semibold text-white mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">© 2026 FinÉduq. Tous droits réservés. Fait avec dévouement pour la jeunesse ivoirienne.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
