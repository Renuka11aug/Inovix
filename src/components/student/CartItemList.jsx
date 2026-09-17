import React from 'react';
import CartItem from './CartItem.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function CartItemList({ items = [], onIncrement, onDecrement }) {
  if (items.length === 0) return <EmptyState title="Your basket is empty" />;
  return (
    <div>
      {items.map(([name, i]) => (
        <CartItem key={name} name={name} price={i.price} qty={i.qty} onIncrement={() => onIncrement(name)} onDecrement={() => onDecrement(name)} />
      ))}
    </div>
  );
}
