import React from 'react';

export default function CategoryCard({ label, icon, active = false, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--primary-soft)' : 'var(--surface-muted)',
        border: active ? '2px solid var(--primary)' : '1px solid var(--border-light)', fontSize: 22,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 12.5, fontWeight: active ? 700 : 500, color: active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</span>
    </button>
  );
}
