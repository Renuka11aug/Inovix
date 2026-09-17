import React from 'react';
import FoodImage from './FoodImage.jsx';
import PriceDisplay from './PriceDisplay.jsx';
import AddToCartButton from './AddToCartButton.jsx';
import QuantitySelector from './QuantitySelector.jsx';

export default function FoodCard({ item, qty = 0, onAdd, onIncrement, onDecrement }) {
  const oos = item.status === 'out-of-stock';
  return (
    <article style={{
      background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)',
      overflow: 'hidden', boxShadow: 'var(--shadow-sm)', opacity: oos ? 0.7 : 1, position: 'relative',
    }}>
      <FoodImage src={item.image} alt={item.name} />
      {item.discount && (
        <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--success)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
          {item.discount}
        </span>
      )}
      {oos && (
        <div style={{ position: 'absolute', inset: 0, top: 0, height: 130, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 12.5 }}>Out of stock</span>
        </div>
      )}
      <div style={{ padding: 'var(--space-4)' }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, minHeight: 32 }}>{item.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <PriceDisplay amount={item.price} strikeAmount={item.strikePrice} />
          {qty > 0
            ? <QuantitySelector qty={qty} onIncrement={onIncrement} onDecrement={onDecrement} />
            : <AddToCartButton disabled={oos} onClick={onAdd} />}
        </div>
      </div>
    </article>
  );
}
