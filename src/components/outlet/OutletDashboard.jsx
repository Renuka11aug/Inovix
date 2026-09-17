import React from 'react';
import RevenueCard from './RevenueCard.jsx';
import OrderStats from './OrderStats.jsx';
import SalesChart from './SalesChart.jsx';
import OrderQueue from './OrderQueue.jsx';
import PageHeader from '../layout/PageHeader.jsx';

export default function OutletDashboard({ revenue = 0, delta = 0, orderCounts = {}, chartData = [], incomingOrders = [], onAccept, onReject }) {
  return (
    <div>
      <PageHeader title="Dashboard" description="Today's overview for The Commons" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <RevenueCard revenue={revenue} delta={delta} />
        <OrderStats total={orderCounts.total || 0} pending={orderCounts.pending || 0} completed={orderCounts.completed || 0} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        <SalesChart data={chartData} />
        <div>
          <h4 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 'var(--space-4)' }}>Incoming orders</h4>
          <OrderQueue orders={incomingOrders} onAccept={onAccept} onReject={onReject} />
        </div>
      </div>
    </div>
  );
}
