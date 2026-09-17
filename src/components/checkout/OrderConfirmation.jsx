import React from 'react';
import Button from '../ui/Button.jsx';

export default function OrderConfirmation({ order, onTrack }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', textAlign: 'center' }}>
      <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order confirmed</p>
      <h2 className="t-h2" style={{ margin: '8px 0' }}>{order.outletName}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 'var(--space-6)' }}>{order.count} items · ₹{order.total} · Ready in {order.prep || '10-15 min'}</p>
      <Button onClick={onTrack} style={{ width: '100%' }}>Track order</Button>
    </div>
  );
}
