import React from 'react';
import OutletCard from './OutletCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function OutletGrid({ outlets = [], onSelect }) {
  if (outlets.length === 0) return <EmptyState title="No outlets match that search" />;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
      {outlets.map((o) => <OutletCard key={o.id} outlet={o} onClick={onSelect} />)}
    </div>
  );
}
