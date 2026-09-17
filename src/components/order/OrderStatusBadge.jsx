import React from 'react';

const LABEL = { PENDING: 'PENDING', ACCEPTED: 'ACCEPTED', REJECTED: 'REJECTED', PREPARING: 'PREPARING', READY: 'READY', COMPLETED: 'COMPLETED', CANCELLED: 'CANCELLED' };
const COLOR = { PENDING: 'var(--info)', ACCEPTED: 'var(--info)', REJECTED: 'var(--error)', PREPARING: 'var(--warning)', READY: 'var(--success)', COMPLETED: 'var(--text-muted)', CANCELLED: 'var(--error)' };

export default function OrderStatusBadge({ status = 'PENDING' }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', padding: '5px 10px', borderRadius: 'var(--radius-full)', background: COLOR[status] }}>
      {LABEL[status]}
    </span>
  );
}
