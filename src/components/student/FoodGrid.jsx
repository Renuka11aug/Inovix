import React from 'react';
import FoodCard from './FoodCard.jsx';

export default function FoodGrid({ items = [], cart = {}, onAdd, onIncrement, onDecrement, title }) {
  return (
    <section style={{ marginBottom: 'var(--space-8)' }}>
      {title && <h3 className="t-h3" style={{ marginBottom: 'var(--space-4)' }}>{title}</h3>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-5)' }}>
        {items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            qty={cart[item.id]?.qty || 0}
            onAdd={() => onAdd(item)}
            onIncrement={() => onIncrement(item)}
            onDecrement={() => onDecrement(item)}
          />
        ))}
      </div>
    </section>
  );
}
