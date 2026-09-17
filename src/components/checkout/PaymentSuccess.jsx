import React from 'react';
import Button from '../ui/Button.jsx';

export default function PaymentSuccess({ amount, onContinue }) {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-4)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--success-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700 }}>Payment successful</h3>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '6px 0 var(--space-6)' }}>₹{amount} paid. Your order is on its way to the kitchen.</p>
      <Button onClick={onContinue} style={{ width: '100%' }}>View order status</Button>
    </div>
  );
}
