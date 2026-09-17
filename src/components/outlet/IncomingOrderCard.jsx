import React from 'react';
import OrderAcceptButton from './OrderAcceptButton.jsx';
import OrderRejectButton from './OrderRejectButton.jsx';

export default function IncomingOrderCard({ order, onAccept, onReject }) {
  return (
    <div className="kanban-card">
      <div className="kanban-card-top">
        <span className="kanban-card-id">#{order.id}</span>
        <span className="kanban-card-time">{order.time}</span>
      </div>
      <div className="kanban-card-items">{order.itemsSummary}</div>
      <div className="kanban-card-actions">
        <OrderAcceptButton onClick={() => onAccept && onAccept(order)} />
        <OrderRejectButton onClick={() => onReject && onReject(order)} />
      </div>
    </div>
  );
}
