import React from 'react';

const LABEL = { open: 'OPEN', busy: 'BUSY', closed: 'CLOSED' };
const TONE = { open: 'success', busy: 'warning', closed: 'error' };

export default function OutletStatus({ status = 'open' }) {
  const dotColor = { open: 'var(--success)', busy: 'var(--warning)', closed: 'var(--error)' }[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-full)',
      background: 'rgba(255,255,255,0.92)', color: 'var(--text-primary)',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor }} />
      {LABEL[status]}
    </span>
  );
}
