import React from 'react';
import StatCard from './StatCard.jsx';

export default function OrderStats({ total, pending, completed }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-4)' }}>
      <StatCard label="Orders today" value={total} />
      <StatCard label="Pending" value={pending} />
      <StatCard label="Completed" value={completed} />
    </div>
  );
}
