import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProgressBar, Modal } from '@/components/ui';
import { savingsGoals, formatFCFA } from '@/data';
import type { ScreenName } from '@/types';

type SavingsProps = {
  onNavigate: (screen: ScreenName) => void;
};

const colorClasses: Record<string, { bg: string; text: string; bar: string; border: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500', border: 'border-emerald-200', gradient: 'from-emerald-500 to-emerald-700' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-500', border: 'border-orange-200', gradient: 'from-orange-400 to-orange-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', bar: 'bg-purple-500', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-700' },
};

export function Savings({ onNavigate }: SavingsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [goals, setGoals] = useState(savingsGoals);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  const handleAddGoal = () => {
    if (!newTitle || !newAmount) return;
    const colors = ['blue', 'emerald', 'orange', 'purple'];
    setGoals([...goals, {
      id: `g${Date.now()}`,
      title: newTitle,
      icon: 'Target',
      targetAmount: parseInt(newAmount) || 0,
      currentAmount: 0,
      deadline: '2027-12-31',
      color: colors[goals.length % colors.length],
    }]);
    setNewTitle('');
    setNewAmount('');
    setShowAddModal(false);
  };

  const handleDeposit = () => {
    if (!selectedGoal || !depositAmount) return;
    setGoals(goals.map(g =>
      g.id === selectedGoal ? { ...g, currentAmount: g.currentAmount + parseInt(depositAmount) } : g
    ));
    setDepositAmount('');
    setShowDepositModal(false);
    setSelectedGoal(null);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-emerald-600 to-teal-700 border-0 fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Icon name="PiggyBank" size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mes objectifs d'épargne</h2>
              <p className="text-emerald-100 text-sm mt-1">{formatFCFA(totalSaved)} sur {formatFCFA(totalTarget)}</p>
            </div>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-white text-emerald-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-md whitespace-nowrap flex items-center gap-2">
            <Icon name="Plus" size={18} />
            Nouvel objectif
          </button>
        </div>
      </div>

      {/* Overall progress */}
      <div className="card p-6 slide-up">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">Progression globale</h3>
          <span className="text-2xl font-bold text-emerald-600">{Math.round((totalSaved / totalTarget) * 100)}%</span>
        </div>
        <ProgressBar value={totalSaved} max={totalTarget} color="emerald" size="lg" />
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total épargné</p>
            <p className="text-lg font-bold text-slate-900">{formatFCFA(totalSaved)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Objectif total</p>
            <p className="text-lg font-bold text-slate-900">{formatFCFA(totalTarget)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Reste à épargner</p>
            <p className="text-lg font-bold text-slate-900">{formatFCFA(totalTarget - totalSaved)}</p>
          </div>
        </div>
      </div>

      {/* Goals grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {goals.map((goal, i) => {
          const colors = colorClasses[goal.color] || colorClasses.blue;
          const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          return (
            <div key={goal.id} className="card-hover p-6 slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                    <Icon name={goal.icon} size={24} className={colors.text} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{goal.title}</h4>
                    <p className="text-xs text-slate-400">Échéance: {new Date(goal.deadline).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <span className={`badge ${colors.bg} ${colors.text}`}>{percentage}%</span>
              </div>

              <div className="mb-4">
                <ProgressBar value={goal.currentAmount} max={goal.targetAmount} color={goal.color} size="md" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400">Épargné</p>
                  <p className="font-bold text-slate-900">{formatFCFA(goal.currentAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Objectif</p>
                  <p className="font-bold text-slate-600">{formatFCFA(goal.targetAmount)}</p>
                </div>
              </div>

              <button
                onClick={() => { setSelectedGoal(goal.id); setShowDepositModal(true); }}
                className={`btn ${colors.bar} text-white hover:opacity-90 w-full py-2.5 text-sm`}
              >
                <Icon name="Plus" size={18} />
                Ajouter de l'argent
              </button>
            </div>
          );
        })}
      </div>

      {/* Tip card */}
      <div className="card p-6 bg-gradient-to-br from-blue-50 to-emerald-50 border-0">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <Icon name="Lightbulb" size={24} className="text-orange-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Conseil du jour</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Essaie la méthode 50/30/20: 50% pour tes besoins, 30% pour tes envies, et 20% pour ton épargne. Même avec un petit revenu, ça marche!</p>
            <button onClick={() => onNavigate('lessons')} className="text-sm text-blue-600 font-semibold hover:underline mt-2 flex items-center gap-1">
              En apprendre plus <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Add goal modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Nouvel objectif d'épargne"
        footer={
          <>
            <button onClick={() => setShowAddModal(false)} className="btn-outline px-5 py-2.5 text-sm">Annuler</button>
            <button onClick={handleAddGoal} className="btn-primary px-5 py-2.5 text-sm">Créer</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Nom de l'objectif</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="ex: Voyage à Abidjan"
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Montant cible (FCFA)</label>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="ex: 100000"
              className="input-field"
            />
          </div>
        </div>
      </Modal>

      {/* Deposit modal */}
      <Modal
        open={showDepositModal}
        onClose={() => { setShowDepositModal(false); setSelectedGoal(null); }}
        title="Ajouter à l'épargne"
        footer={
          <>
            <button onClick={() => { setShowDepositModal(false); setSelectedGoal(null); }} className="btn-outline px-5 py-2.5 text-sm">Annuler</button>
            <button onClick={handleDeposit} className="btn-green px-5 py-2.5 text-sm">Déposer</button>
          </>
        }
      >
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1.5">Montant à déposer (FCFA)</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="ex: 5000"
            className="input-field"
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            {[1000, 2000, 5000, 10000].map((amt) => (
              <button
                key={amt}
                onClick={() => setDepositAmount(amt.toString())}
                className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                {amt.toLocaleString()} F
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
