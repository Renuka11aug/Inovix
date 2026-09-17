import React from 'react';
import PageHeader from '../layout/PageHeader.jsx';
import AdminStatCard from './AdminStatCard.jsx';
import SalesChart from '../outlet/SalesChart.jsx';

export default function AdminDashboard({ stats = {}, chartData = [] }) {
  return (
    <div>
      <PageHeader title="Platform overview" description="Nosh — all campuses" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <AdminStatCard label="Total students" value={stats.students ?? 0} delta={stats.studentsDelta} />
        <AdminStatCard label="Active outlets" value={stats.outlets ?? 0} delta={stats.outletsDelta} />
        <AdminStatCard label="Orders today" value={stats.orders ?? 0} delta={stats.ordersDelta} />
        <AdminStatCard label="Revenue today" value={`₹${(stats.revenue ?? 0).toLocaleString('en-IN')}`} delta={stats.revenueDelta} />
      </div>
      <SalesChart data={chartData} title="Platform orders this week" />
    </div>
  );
}
