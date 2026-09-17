import React from 'react';
import Button from '../ui/Button.jsx';

export default function PaymentFailed({ reason = 'Your bank declined this transaction.', onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-4)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--error-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--error)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700 }}>Payment failed</h3>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 var(--space-6)' }}>{reason}</p>
      <Button onClick={onRetry} variant="destructive" style={{ width: '100%' }}>Try again</Button>
    </div>
  );
}
