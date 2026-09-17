import React from 'react';

const OPTIONS = [
  { key: 'open', label: 'Open', color: 'var(--success)' },
  { key: 'busy', label: 'Busy', color: 'var(--warning)' },
  { key: 'closed', label: 'Closed', color: 'var(--error)' },
];

export default function OutletStatusToggle({ status, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange && onChange(o.key)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 'var(--radius-md)',
            border: status === o.key ? `1.5px solid ${o.color}` : '1px solid var(--border)',
            background: status === o.key ? 'var(--surface)' : 'var(--surface-muted)',
            fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', cursor: 'pointer',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.color }} />
          {o.label}
        </button>
      ))}
    </div>
  );
}
