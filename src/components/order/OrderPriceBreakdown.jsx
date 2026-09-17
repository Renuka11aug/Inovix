import React from 'react';

export default function OrderPriceBreakdown({ subtotal, fee = 0 }) {
  return (
    <div style={{ borderTop: '1px solid var(--border-light)', marginTop: 8, paddingTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}><span>Fee</span><span>₹{fee}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15.5, fontWeight: 700, marginTop: 6 }}><span>Total</span><span>₹{subtotal + fee}</span></div>
    </div>
  );
}
