import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderDetails from '../../components/order/OrderDetails.jsx';
import { orderRows } from '../../mockData.js';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const row = orderRows.find((o) => o.id === orderId) || orderRows[0];
  const order = {
    id: row.id,
    outletName: row.outlet,
    status: row.status,
    total: row.total,
    pickupCode: 'A7X2',
    items: [{ name: 'Miso sesame grain bowl', qty: 1, price: 185 }],
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <button onClick={() => navigate('/orders')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginBottom: 16, cursor: 'pointer', fontSize: 13 }}>&larr; Back to orders</button>
      <OrderDetails order={order} onReorder={() => navigate('/')} />
    </div>
  );
}
