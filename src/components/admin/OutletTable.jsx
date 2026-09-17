import React from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

export default function OutletTable({ outlets = [], onApprove, onSuspend }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr><th>Outlet</th><th>Campus</th><th>Orders (30d)</th><th>Status</th><th /></tr></thead>
        <tbody>
          {outlets.map((o) => (
            <tr key={o.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{o.name}</td>
              <td>{o.campus}</td>
              <td>{o.orders30d}</td>
              <td><Badge tone={o.status === 'approved' ? 'success' : o.status === 'pending' ? 'warning' : 'error'}>{o.status}</Badge></td>
              <td style={{ display: 'flex', gap: 8 }}>
                {o.status === 'pending' && <Button size="sm" onClick={() => onApprove && onApprove(o)}>Approve</Button>}
                <Button size="sm" variant="destructive" onClick={() => onSuspend && onSuspend(o)}>Suspend</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
