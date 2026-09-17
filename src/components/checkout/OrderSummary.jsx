import React from 'react';

export default function OrderSummary({ outletName, items = [], subtotal, fee = 0 }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
      <h4 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 'var(--space-4)' }}>{outletName}</h4>
      {items.map(([name, i]) => (
        <div key={name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '6px 0', color: 'var(--text-secondary)' }}>
          <span>{i.qty} &times; {name}</span><span>₹{i.qty * i.price}</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-light)', marginTop: 10, paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}><span>Fee</span><span>₹{fee}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15.5, fontWeight: 700, marginTop: 6 }}><span>Total</span><span>₹{subtotal + fee}</span></div>
      </div>
    </div>
  );
}
