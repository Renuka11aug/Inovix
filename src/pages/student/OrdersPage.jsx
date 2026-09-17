import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderList from '../../components/order/OrderList.jsx';
import PageHeader from '../../components/layout/PageHeader.jsx';
import { orderRows } from '../../mockData.js';

const demoOrders = orderRows.map((o) => ({
  ...o, outletName: o.outlet, count: 2, total: o.total, placedAt: 'Today',
}));

export default function OrdersPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Your orders" />
      <OrderList orders={demoOrders} onSelect={(o) => navigate(`/orders/${o.id}`)} />
    </div>
  );
}
