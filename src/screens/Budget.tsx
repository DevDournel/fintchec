import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProgressBar, DonutChart } from '@/components/ui';
import { budgetCategories, formatFCFA } from '@/data';
import type { ScreenName } from '@/types';

type BudgetProps = {
  onNavigate: (screen: ScreenName) => void;
};

const colorClasses: Record<string, { bg: string; text: string; bar: string; light: string }> = {
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-500', light: '#f97316' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500', light: '#3b82f6' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', bar: 'bg-purple-500', light: '#a855f7' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500', light: '#10b981' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', bar: 'bg-pink-500', light: '#ec4899' },
  red: { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-500', light: '#ef4444' },
};

export function Budget({ onNavigate }: BudgetProps) {
  const [categories, setCategories] = useState(budgetCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remaining = totalAllocated - totalSpent;

  const donutData = categories.map((c) => ({
    label: c.name,
    value: c.spent,
    color: colorClasses[c.color]?.light || '#3b82f6',
  }));

  const handleAddCategory = () => {
    if (!newName || !newAmount) return;
    const colors = ['orange', 'blue', 'purple', 'emerald', 'pink', 'red'];
    setCategories([...categories, {
      id: `b${Date.now()}`,
      name: newName,
      icon: 'Tag',
      allocated: parseInt(newAmount) || 0,
      spent: 0,
      color: colors[categories.length % colors.length],
    }]);
    setNewName('');
    setNewAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-orange-500 to-orange-600 border-0 fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <Icon name="Wallet" size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mon budget mensuel</h2>
              <p className="text-orange-100 text-sm mt-1">Planifie et suis tes dépenses</p>
            </div>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-white text-orange-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors shadow-md whitespace-nowrap flex items-center gap-2">
            <Icon name="Plus" size={18} />
            Ajouter catégorie
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Budget total</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{formatFCFA(totalAllocated)}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Icon name="Wallet" size={22} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card p-5 slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Dépensé</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{formatFCFA(totalSpent)}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <Icon name="TrendingDown" size={22} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="card p-5 slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Restant</p>
              <p className={`text-2xl font-bold mt-1 ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatFCFA(remaining)}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${remaining >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <Icon name={remaining >= 0 ? 'PiggyBank' : 'AlertTriangle'} size={22} className={remaining >= 0 ? 'text-emerald-600' : 'text-red-600'} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Donut chart */}
        <div className="card p-6 slide-up">
          <h3 className="section-title mb-4">Répartition des dépenses</h3>
          <div className="flex justify-center mb-4">
            <DonutChart data={donutData} size={200} />
          </div>
          <div className="space-y-2">
            {categories.map((cat) => {
              const colors = colorClasses[cat.color] || colorClasses.blue;
              return (
                <div key={cat.id} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${colors.bar}`} />
                  <span className="text-slate-600 flex-1 truncate">{cat.name}</span>
                  <span className="font-semibold text-slate-900">{formatFCFA(cat.spent)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category list */}
        <div className="lg:col-span-2 space-y-4">
          {categories.map((cat, i) => {
            const colors = colorClasses[cat.color] || colorClasses.blue;
            const percentage = Math.round((cat.spent / cat.allocated) * 100);
            const overBudget = cat.spent > cat.allocated;
            return (
              <div key={cat.id} className="card p-5 slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon name={cat.icon} size={20} className={colors.text} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{cat.name}</p>
                      <p className="text-xs text-slate-400">{formatFCFA(cat.allocated)} alloué</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${overBudget ? 'text-red-600' : 'text-slate-900'}`}>{formatFCFA(cat.spent)}</p>
                    <p className={`text-xs ${overBudget ? 'text-red-500' : 'text-slate-400'}`}>
                      {overBudget ? 'Dépassé de ' : 'Reste '}{formatFCFA(Math.abs(cat.allocated - cat.spent))}
                    </p>
                  </div>
                </div>
                <ProgressBar
                  value={cat.spent}
                  max={cat.allocated}
                  color={overBudget ? 'red' : cat.color}
                  size="sm"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400">{percentage}% utilisé</span>
                  {overBudget && <span className="badge-red"><Icon name="AlertTriangle" size={12} /> Budget dépassé</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="card p-6 bg-gradient-to-br from-orange-50 to-blue-50 border-0">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <Icon name="PieChart" size={24} className="text-blue-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Régle 50/30/20</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Une règle simple: 50% pour tes besoins (nourriture, transport), 30% pour tes envies (loisirs), et 20% pour ton épargne. Adapte ces pourcentages à ta situation!</p>
            <button onClick={() => onNavigate('lessons')} className="text-sm text-blue-600 font-semibold hover:underline mt-2 flex items-center gap-1">
              Voir la leçon sur le budget <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Add category modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={() => setShowAddModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative card max-w-md w-full p-6 slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Nouvelle catégorie</h3>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Nom de la catégorie</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="ex: Sorties" className="input-field" autoFocus />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Montant alloué (FCFA)</label>
                <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="ex: 5000" className="input-field" />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowAddModal(false)} className="btn-outline px-5 py-2.5 text-sm">Annuler</button>
              <button onClick={handleAddCategory} className="btn-primary px-5 py-2.5 text-sm">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
