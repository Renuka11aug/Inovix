import React from 'react';
import Badge from '../ui/Badge.jsx';

export default function PaymentTable({ payments = [] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr><th>Transaction</th><th>Student</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.id}</td>
              <td>{p.student}</td>
              <td>₹{p.amount}</td>
              <td>{p.method}</td>
              <td><Badge tone={p.status === 'success' ? 'success' : p.status === 'pending' ? 'warning' : 'error'}>{p.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
