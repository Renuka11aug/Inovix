import React from 'react';
import OrderStatusBadge from './OrderStatusBadge.jsx';
import OrderStatusTimeline from './OrderStatusTimeline.jsx';
import OrderItems from './OrderItems.jsx';
import OrderPriceBreakdown from './OrderPriceBreakdown.jsx';
import OrderActions from './OrderActions.jsx';
import PickupCode from './PickupCode.jsx';

export default function OrderDetails({ order, onCancel, onReorder, onPickedUp }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 460 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="t-h3">{order.outletName}</h2>
        <OrderStatusBadge status={order.status} />
      </div>
      <OrderStatusTimeline status={order.status} />
      {order.status === 'READY' && <PickupCode code={order.pickupCode} />}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
        <OrderItems items={order.items || []} />
        <OrderPriceBreakdown subtotal={order.total} />
      </div>
      <OrderActions status={order.status} onCancel={onCancel} onReorder={onReorder} onPickedUp={onPickedUp} />
    </div>
  );
}
