import React from 'react';
import IncomingOrderCard from './IncomingOrderCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function OrderQueue({ orders = [], onAccept, onReject }) {
  if (orders.length === 0) return <EmptyState title="No incoming orders" message="New orders will appear here in real time." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 360 }}>
      {orders.map((o) => <IncomingOrderCard key={o.id} order={o} onAccept={onAccept} onReject={onReject} />)}
    </div>
  );
}
