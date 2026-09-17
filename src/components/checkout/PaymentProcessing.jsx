import React from 'react';
import Spinner from '../ui/Spinner.jsx';

export default function PaymentProcessing() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}>
      <Spinner size="lg" />
      <p style={{ marginTop: 'var(--space-4)', fontWeight: 700 }}>Processing your payment…</p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Don't close this window.</p>
    </div>
  );
}
