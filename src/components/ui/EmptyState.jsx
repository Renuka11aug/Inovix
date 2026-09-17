import React from 'react';

export default function EmptyState({ title = 'Nothing here yet', message, action }) {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)', color: 'var(--text-muted)' }}>
      <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</p>
      {message && <p style={{ fontSize: 13.5, marginBottom: action ? 'var(--space-4)' : 0 }}>{message}</p>}
      {action}
    </div>
  );
}
