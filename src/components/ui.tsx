import { Icon } from './Icon';

type ProgressBarProps = {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export function ProgressBar({ value, max = 100, color = 'blue', showLabel = false, size = 'md' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClass = `bg-${color}-500`;

  const heightClass = size === 'sm' ? 'h-2' : size === 'lg' ? 'h-4' : 'h-3';

  return (
    <div className="w-full">
      <div className={`w-full ${heightClass} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 flex justify-between text-xs">
          <span className="text-slate-500">{percentage.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}

type DonutChartProps = {
  data: { label: string; value: number; color: string }[];
  size?: number;
};

export function DonutChart({ data, size = 200 }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={16} />
        {data.map((item, i) => {
          const dash = (item.value / total) * circumference;
          const segment = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`var(--chart-${item.color}, ${item.color})`}
              strokeWidth={16}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          );
          offset += dash;
          return segment;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{total.toLocaleString()}</span>
        <span className="text-xs text-slate-500">FCFA total</span>
      </div>
    </div>
  );
}

type BarChartProps = {
  data: { label: string; value: number; color: string }[];
  maxValue?: number;
};

export function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value)) * 1.15;
  return (
    <div className="flex items-end justify-between gap-2 h-40 pt-4">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1">
          <div className="w-full flex flex-col justify-end h-28 relative group">
            <div
              className={`w-full bg-${item.color}-500 rounded-t-lg transition-all duration-700 ease-out hover:bg-${item.color}-600 cursor-pointer relative`}
              style={{ height: `${(item.value / max) * 100}%` }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
                {item.value.toLocaleString()} F
              </div>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium text-center truncate w-full">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

type SparklineProps = {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
};

export function Sparkline({ data, color = '#3b82f6', height = 60, width = 200 }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height * 0.8 - height * 0.1}`).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polygon points={areaPoints} fill={color} opacity={0.1} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend?: number;
  trendLabel?: string;
};

export function StatCard({ label, value, icon, color, trend, trendLabel }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="card p-5 slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.blue}`}>
          <Icon name={icon} size={22} />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`text-xs font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-xs text-slate-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div className="relative card max-w-md w-full p-6 slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {footer && <div className="flex gap-3 justify-end">{footer}</div>}
      </div>
    </div>
  );
}
