import React from 'react';

export default function PriceDisplay({ amount, strikeAmount, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontSize: size, fontWeight: 700, color: 'var(--text-primary)' }}>₹{amount}</span>
      {strikeAmount && (
        <span style={{ fontSize: size - 2, color: 'var(--text-placeholder)', textDecoration: 'line-through' }}>₹{strikeAmount}</span>
      )}
    </span>
  );
}
