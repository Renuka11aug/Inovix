import React from 'react';

export default function CartButton({ count = 0, amount = 0, onClick }) {
  return (
    <button
      className="cart-pill"
      onClick={onClick}
      aria-label="View cart"
      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--primary)', border: 'none', borderRadius: 'var(--radius-md)', padding: '0 var(--space-4)', height: 44 }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>{count} items</span>
        <span style={{ fontSize: 13, fontWeight: 700 }}>₹{amount}</span>
      </span>
    </button>
  );
}
