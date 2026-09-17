import React from 'react';

export default function ChartCard({ title, children, actions }) {
  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <h4>{title}</h4>
        {actions}
      </div>
      {children}
    </div>
  );
}
