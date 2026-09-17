import React from 'react';

/** Minimal dependency-free bar chart so the library has no external chart lib requirement. */
export default function SalesChart({ data = [], title = 'Sales this week' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="chart-card">
      <div className="chart-card-head"><h4>{title}</h4></div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
        {data.map((d) => (
          <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: '100%', height: `${(d.value / max) * 100}%`, background: 'var(--primary)', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
