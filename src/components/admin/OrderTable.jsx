import React from 'react';
import OrderStatusBadge from '../order/OrderStatusBadge.jsx';

export default function OrderTable({ orders = [] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr><th>Order</th><th>Student</th><th>Outlet</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>#{o.id}</td>
              <td>{o.student}</td>
              <td>{o.outlet}</td>
              <td>₹{o.total}</td>
              <td><OrderStatusBadge status={o.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
