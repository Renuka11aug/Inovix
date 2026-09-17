import React from 'react';

export default function QuantitySelector({ qty, onIncrement, onDecrement, min = 0 }) {
  return (
    <div className="quantity" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '6px 10px' }}>
      <button aria-label="Remove one" onClick={onDecrement} disabled={qty <= min} style={{ background: 'none', border: 'none', fontSize: 16, fontWeight: 700, color: 'var(--primary-hover)', cursor: 'pointer' }}>−</button>
      <span className="qty-val" style={{ fontSize: 13.5, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{qty}</span>
      <button aria-label="Add one" onClick={onIncrement} style={{ background: 'none', border: 'none', fontSize: 16, fontWeight: 700, color: 'var(--primary-hover)', cursor: 'pointer' }}>+</button>
    </div>
  );
}
