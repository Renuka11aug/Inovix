import React from 'react';
import OutletGrid from './OutletGrid.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function StudentHome({ userName = 'Riya', outlets = [], activeOrder, onSelectOutlet, onDismissOrder }) {
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      <div className="greeting" style={{ marginBottom: 'var(--space-5)' }}>
        <p className="t-h2">{greeting}, {userName}</p>
        <p className="t-body-sm" style={{ color: 'var(--text-muted)', marginTop: 2 }}>
          North Campus · {outlets.filter((o) => o.status === 'open').length} outlets open now
        </p>
      </div>

      {activeOrder ? (
        <div className="order-status-card" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="osc-top">
            <div>
              <div className="osc-outlet">{activeOrder.outletName}</div>
              <div className="osc-sub">{activeOrder.count} items · ₹{activeOrder.total}</div>
            </div>
            <span className={`osc-badge ${activeOrder.status}`}>{activeOrder.status.toUpperCase()}</span>
          </div>
          {activeOrder.status === 'ready' && (
            <button className="btn-order-now osc-dismiss" onClick={onDismissOrder}>Order picked up</button>
          )}
        </div>
      ) : (
        <div className="order-banner" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="order-banner-text">
            <div className="order-banner-title">No active orders</div>
            <div className="order-banner-sub">Hungry? Browse outlets below and place your first order.</div>
          </div>
          <button className="btn-order-now">Order now</button>
        </div>
      )}

      <h3 className="t-h3" style={{ marginBottom: 'var(--space-4)' }}>Discover outlets</h3>
      <OutletGrid outlets={outlets} onSelect={onSelectOutlet} />
    </div>
  );
}
