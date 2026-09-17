import React from 'react';
import OrderCard from './OrderCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function OrderList({ orders = [], onSelect }) {
  if (orders.length === 0) return <EmptyState title="No orders yet" />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {orders.map((o) => <OrderCard key={o.id} order={o} onClick={onSelect} />)}
    </div>
  );
}
