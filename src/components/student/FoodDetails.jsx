import React from 'react';
import FoodImage from './FoodImage.jsx';
import PriceDisplay from './PriceDisplay.jsx';
import Button from '../ui/Button.jsx';

export default function FoodDetails({ item, qty, onAdd, onIncrement, onDecrement }) {
  return (
    <div>
      <FoodImage src={item.image} alt={item.name} height={200} />
      <div style={{ padding: 'var(--space-5) 0' }}>
        <h2 className="t-h2">{item.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '8px 0 16px' }}>{item.desc}</p>
        <PriceDisplay amount={item.price} strikeAmount={item.strikePrice} size={20} />
        <div style={{ marginTop: 'var(--space-6)' }}>
          {qty > 0 ? (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button onClick={onDecrement} style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: 18 }}>−</button>
              <span style={{ fontWeight: 700, fontSize: 16 }}>{qty}</span>
              <button onClick={onIncrement} style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: 18 }}>+</button>
            </div>
          ) : (
            <Button onClick={onAdd} style={{ width: '100%' }}>Add to cart</Button>
          )}
        </div>
      </div>
    </div>
  );
}
