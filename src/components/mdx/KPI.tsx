"use client";

interface KPIProps {
  title?: string;
  metric: string;
  label: string;
}

export default function KPI({ title, metric, label }: KPIProps) {
  return (
    <div className="kpi-card bg-surface-elevated border border-border rounded-xl p-6 md:p-8 text-center hover:border-border-hover transition-colors">
      {title && (
        <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
          {title}
        </div>
      )}
      <div className="text-4xl md:text-5xl font-semibold text-accent mb-2">
        {metric}
      </div>
      <div className="text-sm md:text-base text-text-secondary">
        {label}
      </div>
    </div>
  );
}
