import React from 'react';
import IncomingOrderCard from './IncomingOrderCard.jsx';

export default function OrderColumn({ title, orders = [], onAccept, onReject }) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-head">
        <h4>{title}</h4>
        <span className="kanban-count">{orders.length}</span>
      </div>
      {orders.map((o) => <IncomingOrderCard key={o.id} order={o} onAccept={onAccept} onReject={onReject} />)}
    </div>
  );
}
