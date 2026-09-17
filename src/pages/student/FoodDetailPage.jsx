import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import FoodDetails from '../../components/student/FoodDetails.jsx';
import { menuItems } from '../../mockData.js';

export default function FoodDetailPage() {
  const { foodId } = useParams();
  const { cart, addItem, incrementItem, decrementItem } = useOutletContext();
  const item = menuItems.find((m) => m.id === foodId) || menuItems[0];
  const qty = cart[item.id]?.qty || 0;

  return (
    <div style={{ maxWidth: 460 }}>
      <FoodDetails
        item={item}
        qty={qty}
        onAdd={() => addItem(item)}
        onIncrement={() => incrementItem(item)}
        onDecrement={() => decrementItem(item)}
      />
    </div>
  );
}
