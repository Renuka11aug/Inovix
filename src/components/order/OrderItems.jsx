import React from 'react';

export default function OrderItems({ items = [] }) {
  return (
    <div>
      {items.map((it) => (
        <div key={it.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '6px 0', color: 'var(--text-secondary)' }}>
          <span>{it.qty} &times; {it.name}</span><span>₹{it.qty * it.price}</span>
        </div>
      ))}
    </div>
  );
}
