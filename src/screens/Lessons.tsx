import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProgressBar } from '@/components/ui';
import { lessons, categoryLabels, levelLabels, formatFCFA } from '@/data';
import type { ScreenName, Lesson } from '@/types';

type LessonsProps = {
  onNavigate: (screen: ScreenName, lessonId?: string) => void;
};

const categoryIcons: Record<string, string> = {
  basics: 'BookOpen',
  budgeting: 'Wallet',
  saving: 'PiggyBank',
  payment: 'Smartphone',
  investing: 'TrendingUp',
  debt: 'AlertTriangle',
};

const categoryColors: Record<string, string> = {
  basics: 'blue',
  budgeting: 'orange',
  saving: 'emerald',
  payment: 'purple',
  investing: 'teal',
  debt: 'red',
};

export function Lessons({ onNavigate }: LessonsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = lessons.filter((l) => {
    const matchFilter = filter === 'all' || l.category === filter;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-emerald-600 to-teal-700 border-0 fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <Icon name="BookOpen" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bibliothèque de leçons</h2>
            <p className="text-emerald-100 text-sm mt-1">Apprends à ton rythme, gagne des badges</p>
          </div>
        </div>
      </div>

      {/* Search & filters */}
      <div className="space-y-4">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une leçon..."
            className="input-field pl-12"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Toutes
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filter === key ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon name={categoryIcons[key]} size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((lesson, i) => {
          const color = categoryColors[lesson.category];
          return (
            <button
              key={lesson.id}
              onClick={() => !lesson.locked && onNavigate('lesson-detail', lesson.id)}
              disabled={lesson.locked}
              className={`card-hover p-5 text-left slide-up ${lesson.locked ? 'opacity-60 cursor-not-allowed' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center`}>
                  <Icon name={lesson.locked ? 'Lock' : categoryIcons[lesson.category]} size={24} className={`text-${color}-600`} />
                </div>
                {lesson.completed ? (
                  <span className="badge-green"><Icon name="Check" size={12} /> Terminé</span>
                ) : lesson.progress > 0 ? (
                  <span className="badge-orange">{lesson.progress}%</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-orange-400 fill-orange-400" />
                    <span className="text-xs font-semibold text-slate-600">{lesson.rating}</span>
                  </div>
                )}
              </div>

              <h4 className="font-bold text-slate-900 mb-1.5 line-clamp-1">{lesson.title}</h4>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{lesson.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className={`badge bg-${color}-50 text-${color}-700`}>{categoryLabels[lesson.category]}</span>
                <span className="badge-gray">{levelLabels[lesson.level]}</span>
              </div>

              {lesson.progress > 0 && !lesson.completed && (
                <div className="mb-3">
                  <ProgressBar value={lesson.progress} color={color} size="sm" />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {lesson.durationMinutes} min</span>
                <span className="flex items-center gap-1"><Icon name="Users" size={14} /> {lesson.studentsCount}</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-slate-400" />
          </div>
          <p className="text-slate-500">Aucune leçon trouvée</p>
        </div>
      )}
    </div>
  );
}

type LessonDetailProps = {
  lessonId: string;
  onNavigate: (screen: ScreenName) => void;
};

export function LessonDetail({ lessonId, onNavigate }: LessonDetailProps) {
  const lesson = lessons.find((l) => l.id === lessonId) || lessons[0];
  const [activeModule, setActiveModule] = useState(0);

  const color = categoryColors[lesson.category];
  const moduleIcons: Record<string, string> = {
    video: 'PlayCircle',
    quiz: 'HelpCircle',
    reading: 'FileText',
    exercise: 'Pencil',
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto pb-24 lg:pb-8">
      <button onClick={() => onNavigate('lessons')} className="btn-ghost px-3 py-1.5 text-sm w-fit">
        <Icon name="ArrowLeft" size={18} />
        Retour aux leçons
      </button>

      {/* Lesson header */}
      <div className={`card p-6 lg:p-8 bg-gradient-to-br from-${color}-600 to-${color}-800 border-0 fade-in`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-white/15 text-white">{categoryLabels[lesson.category]}</span>
          <span className="badge bg-white/15 text-white">{levelLabels[lesson.level]}</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">{lesson.title}</h1>
        <p className="text-white/80 leading-relaxed mb-5">{lesson.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
          <span className="flex items-center gap-1.5"><Icon name="Clock" size={16} /> {lesson.durationMinutes} minutes</span>
          <span className="flex items-center gap-1.5"><Icon name="Users" size={16} /> {lesson.studentsCount} apprenants</span>
          <span className="flex items-center gap-1.5"><Icon name="Star" size={16} className="fill-white" /> {lesson.rating}/5</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-slate-900">Ton progrès</p>
          <span className="text-sm font-bold text-blue-600">{lesson.progress}%</span>
        </div>
        <ProgressBar value={lesson.progress} color={color} size="lg" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Module content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card overflow-hidden">
            <div className={`bg-${color}-50 p-4 flex items-center gap-3`}>
              <Icon name={moduleIcons[lesson.modules[activeModule].type]} size={24} className={`text-${color}-600`} />
              <div>
                <p className="text-xs text-slate-500">Module {activeModule + 1} sur {lesson.modules.length}</p>
                <p className="font-bold text-slate-900">{lesson.modules[activeModule].title}</p>
              </div>
            </div>

            <div className="p-6">
              {lesson.modules[activeModule].type === 'video' && (
                <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                  <div className="relative text-center">
                    <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3`}>
                      <Icon name="Play" size={28} className="text-white ml-1" />
                    </div>
                    <p className="text-white/70 text-sm">Clique pour lire la vidéo</p>
                  </div>
                </div>
              )}

              {lesson.modules[activeModule].type === 'reading' && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{lesson.modules[activeModule].title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    L'argent est un outil qui facilite les échanges. En Côte d'Ivoire, l'argent existe sous plusieurs formes: pièces, billets, et argent électronique via Mobile Money.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Comprendre la valeur de l'argent signifie savoir que chaque FCFA dépensé a un coût d'opportunité. Ce que tu dépenses aujourd'hui ne peut plus être épargné pour demain.
                  </p>
                  <div className={`card p-4 bg-${color}-50 border-0 mt-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Lightbulb" size={18} className={`text-${color}-600`} />
                      <p className="font-semibold text-slate-900">Point clé</p>
                    </div>
                    <p className="text-sm text-slate-600">Avant chaque achat, demande-toi: "Est-ce que j'en ai vraiment besoin maintenant?"</p>
                  </div>
                </div>
              )}

              {lesson.modules[activeModule].type === 'quiz' && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quiz: Question 1 sur 3</h3>
                  <div className="card p-5 mb-4">
                    <p className="font-semibold text-slate-900 mb-4">Quel est le meilleur moment pour commencer à épargner?</p>
                    <div className="space-y-2">
                      {['Quand on gagne beaucoup d\'argent', 'Dès maintenant, même petits montants', 'Quand on est adulte', 'Après avoir dépensé tout le reste'].map((opt, i) => (
                        <button key={i} className="w-full text-left p-3.5 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm text-slate-700 font-medium">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className={`btn bg-${color}-600 text-white hover:bg-${color}-700 px-6 py-2.5`}>
                    Valider ma réponse
                  </button>
                </div>
              )}

              {lesson.modules[activeModule].type === 'exercise' && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Exercice pratique</h3>
                  <p className="text-slate-600 mb-4">Calcule combien tu peux épargner par mois avec tes revenus actuels.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-1.5">Revenu mensuel (FCFA)</label>
                      <input type="number" placeholder="ex: 25000" className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-1.5">Dépenses mensuelles (FCFA)</label>
                      <input type="number" placeholder="ex: 15000" className="input-field" />
                    </div>
                    <button className={`btn bg-${color}-600 text-white hover:bg-${color}-700 px-6 py-2.5`}>
                      Calculer mon épargne possible
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                disabled={activeModule === 0}
                className="btn-ghost px-4 py-2 text-sm disabled:opacity-30"
              >
                <Icon name="ArrowLeft" size={18} />
                Précédent
              </button>
              <span className="text-sm text-slate-400">{activeModule + 1} / {lesson.modules.length}</span>
              <button
                onClick={() => setActiveModule(Math.min(lesson.modules.length - 1, activeModule + 1))}
                disabled={activeModule === lesson.modules.length - 1}
                className={`btn bg-${color}-600 text-white hover:bg-${color}-700 px-4 py-2 text-sm disabled:opacity-30`}
              >
                Suivant
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Module sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="section-title mb-4">Modules</h3>
            <div className="space-y-2">
              {lesson.modules.map((mod, i) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    i === activeModule ? `bg-${color}-50 border border-${color}-200` : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    mod.completed ? `bg-${color}-600 text-white` : i === activeModule ? `bg-${color}-100 text-${color}-700` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {mod.completed ? <Icon name="Check" size={16} /> : <Icon name={moduleIcons[mod.type]} size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{mod.title}</p>
                    <p className="text-xs text-slate-400 capitalize">{mod.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5 bg-gradient-to-br from-orange-50 to-orange-100 border-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Award" size={20} className="text-orange-600" />
              <p className="font-bold text-slate-900">Badge à débloquer</p>
            </div>
            <p className="text-sm text-slate-600">Complète cette leçon pour gagner 50 points et progresser vers le badge "Apprenant"!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
