import React from 'react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

export default function UserTable({ users = [], onSuspend, onView }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead><tr><th>Student</th><th>Email</th><th>Campus</th><th>Status</th><th /></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.campus}</td>
              <td><Badge tone={u.status === 'active' ? 'success' : 'error'}>{u.status}</Badge></td>
              <td style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="outline" onClick={() => onView && onView(u)}>View</Button>
                <Button size="sm" variant="destructive" onClick={() => onSuspend && onSuspend(u)}>Suspend</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
