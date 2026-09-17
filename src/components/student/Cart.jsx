import React from 'react';
import CartItemList from './CartItemList.jsx';
import CartSummary from './CartSummary.jsx';
import CheckoutButton from './CheckoutButton.jsx';
import Alert from '../ui/Alert.jsx';
import Avatar from '../ui/Avatar.jsx';

/** Full "Your order" drawer — outlet info, items, totals, pay button. */
export default function Cart({ open, onClose, outlet, cart = {}, onIncrement, onDecrement, onCheckout }) {
  const items = Object.entries(cart);
  const subtotal = items.reduce((s, [, i]) => s + i.qty * i.price, 0);

  return (
    <>
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer${open ? ' open' : ''}`} aria-label="Your order">
        <div className="drawer-header">
          <span className="drawer-eyebrow">Your basket</span>
          <button className="drawer-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <h2 className="drawer-title">Your order</h2>
        <div className="drawer-body">
          {items.length > 0 && outlet && (
            <div className="drawer-outlet">
              <Avatar name={outlet.name} size={44} />
              <div>
                <div className="drawer-outlet-name">{outlet.name}</div>
                <div className="drawer-outlet-sub">Pickup · {outlet.address}</div>
              </div>
              <span className="drawer-outlet-time"><span className="dot" />{outlet.prep}</span>
            </div>
          )}
          <CartItemList items={items} onIncrement={onIncrement} onDecrement={onDecrement} />
          {items.length > 0 && (
            <>
              <CartSummary subtotal={subtotal} />
              <div style={{ margin: '20px 0 16px' }}>
                <Alert variant="success">Pay online now — no cash needed at pickup.</Alert>
              </div>
              <CheckoutButton total={subtotal} onClick={onCheckout} />
            </>
          )}
        </div>
      </aside>
    </>
  );
}
