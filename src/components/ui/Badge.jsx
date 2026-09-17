import React from 'react';

/** Generic status/category badge — pairs a dot + text, never color alone. */
export default function Badge({ children, tone = 'neutral' }) {
  const toneStyle = {
    neutral: { background: 'var(--surface-muted)', color: 'var(--text-secondary)' },
    success: { background: 'var(--success-soft)', color: 'var(--success)' },
    warning: { background: 'var(--warning-soft)', color: '#92610C' },
    error:   { background: 'var(--error-soft)', color: 'var(--error)' },
    info:    { background: 'var(--info-soft)', color: 'var(--info)' },
    primary: { background: 'var(--primary-soft)', color: 'var(--text-primary)' },
  }[tone];

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11.5, fontWeight: 700, letterSpacing: '0.02em',
      padding: '4px 10px', borderRadius: 'var(--radius-full)',
      ...toneStyle,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {children}
    </span>
  );
}
