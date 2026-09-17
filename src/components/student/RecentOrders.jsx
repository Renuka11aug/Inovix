import React from 'react';
import EmptyState from '../ui/EmptyState.jsx';

export default function RecentOrders({ orders = [], onReorder }) {
  if (orders.length === 0) return <EmptyState title="No recent orders" message="Your past orders will show up here." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {orders.map((o) => (
        <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{o.outletName}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{o.itemsSummary} · ₹{o.total}</div>
          </div>
          <button onClick={() => onReorder && onReorder(o)} style={{ height: 34, padding: '0 14px', fontSize: 12.5, fontWeight: 700, background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            Reorder
          </button>
        </div>
      ))}
    </div>
  );
}
