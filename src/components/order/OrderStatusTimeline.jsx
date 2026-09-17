import React from 'react';

const STAGES = [
  { key: 'PENDING', label: 'Order placed' },
  { key: 'ACCEPTED', label: 'Accepted by outlet' },
  { key: 'PREPARING', label: 'Being prepared' },
  { key: 'READY', label: 'Ready for pickup' },
  { key: 'COMPLETED', label: 'Picked up' },
];

export default function OrderStatusTimeline({ status = 'PENDING' }) {
  const idx = STAGES.findIndex((s) => s.key === status);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {STAGES.map((s, i) => {
        const done = i <= idx;
        return (
          <div key={s.key} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: done ? 'var(--primary-hover)' : 'var(--border)' }} />
              {i < STAGES.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: done ? 'var(--primary-hover)' : 'var(--border-light)' }} />}
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div style={{ fontSize: 13.5, fontWeight: done ? 700 : 500, color: done ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
