import React from 'react';
import OrderStatusBadge from './OrderStatusBadge.jsx';

export default function OrderCard({ order, onClick }) {
  return (
    <article onClick={() => onClick && onClick(order)} style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{order.outletName}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{order.count} items · ₹{order.total}</div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-placeholder)' }}>{order.placedAt || 'Just now'}</div>
    </article>
  );
}
