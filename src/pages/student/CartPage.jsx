import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CartItemList from '../../components/student/CartItemList.jsx';
import CartSummary from '../../components/student/CartSummary.jsx';
import CheckoutButton from '../../components/student/CheckoutButton.jsx';
import Alert from '../../components/ui/Alert.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartByName, cartAmount, cartIncrementByName, cartDecrementByName } = useOutletContext();
  const items = Object.entries(cartByName);

  if (items.length === 0) {
    return <EmptyState title="Your cart is empty" description="Browse outlets and add items to get started." />;
  }

  return (
    <div style={{ maxWidth: 460 }}>
      <h2 className="t-h2" style={{ marginBottom: 'var(--space-4)' }}>Your order</h2>
      <CartItemList items={items} onIncrement={cartIncrementByName} onDecrement={cartDecrementByName} />
      <CartSummary subtotal={cartAmount} />
      <div style={{ margin: '20px 0 16px' }}>
        <Alert variant="success">Pay online now — no cash needed at pickup.</Alert>
      </div>
      <CheckoutButton total={cartAmount} onClick={() => navigate('/checkout')} />
    </div>
  );
}
