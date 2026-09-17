import React from 'react';
import QuantitySelector from './QuantitySelector.jsx';

export default function CartItem({ name, price, qty, onIncrement, onDecrement }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>₹{price} each</div>
      </div>
      <QuantitySelector qty={qty} onIncrement={onIncrement} onDecrement={onDecrement} />
    </div>
  );
}
