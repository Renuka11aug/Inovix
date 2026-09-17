import React from 'react';

export default function CartSummary({ subtotal, fee = 0 }) {
  const total = subtotal + fee;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13.5, color: 'var(--text-muted)' }}>
        <span>Subtotal</span><span>₹{subtotal}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13.5, color: 'var(--text-muted)' }}>
        <span>Campus service fee</span><span>₹{fee}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', marginTop: 8, paddingTop: 16, fontSize: 16, fontWeight: 700 }}>
        <span>Total to pay</span><span>₹{total}</span>
      </div>
    </div>
  );
}
