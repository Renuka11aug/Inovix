import React from 'react';
import StatCard from './StatCard.jsx';

export default function RevenueCard({ revenue, delta }) {
  return <StatCard label="Revenue today" value={`₹${revenue.toLocaleString('en-IN')}`} delta={delta} icon={
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-hover)" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
  } />;
}
