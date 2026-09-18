import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────────────── */
const T = {
  primary: '#B4003A', dark: '#8F002D', light: '#FFF1F3',
  surface: '#FFFFFF', bg: '#FAFAFB',
  text: '#182337', text2: '#737C8C', muted: '#9BA5B4',
  border: '#E8E4E5', ease: '200ms ease',
};

/* ─── Single row ─────────────────────────────────────────────────── */
function CartRow({ item, onIncrement, onDecrement }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', borderBottom: `1px solid ${T.border}`,
    }}>
      {/* Thumbnail */}
      <div style={{
        width: 48, height: 48, borderRadius: 10, overflow: 'hidden',
        flexShrink: 0, background: T.light,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
      }}>
        {item.image
          ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : '🍽️'}
      </div>

      {/* Name + price */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: T.text,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: T.muted }}>₹{item.price} each</p>
      </div>

      {/* Qty controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0,
        border: `1.5px solid ${T.border}`, borderRadius: 9, overflow: 'hidden', flexShrink: 0 }}>
        <button onClick={() => onDecrement(item.id)}
          style={{ width: 30, height: 30, background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text2 }}>
          <Minus size={13} />
        </button>
        <span style={{ minWidth: 24, textAlign: 'center', fontSize: 13, fontWeight: 700,
          color: T.text, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`,
          lineHeight: '30px' }}>{item.qty}</span>
        <button onClick={() => onIncrement(item.id)}
          style={{ width: 30, height: 30, background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text2 }}>
          <Plus size={13} />
        </button>
      </div>

      {/* Line total */}
      <span style={{ fontSize: 14, fontWeight: 700, color: T.text, flexShrink: 0, minWidth: 44, textAlign: 'right' }}>
        ₹{item.price * item.qty}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Cart drawer
   Props: open, onClose, cartItems, cartAmount, onIncrement(id),
          onDecrement(id), onCheckout
   ═══════════════════════════════════════════════════════════════════ */
export default function Cart({ open, onClose, cartItems = [], cartAmount = 0,
  onIncrement, onDecrement, onCheckout }) {

  const navigate = useNavigate();
  const isEmpty  = cartItems.length === 0;

  function goToCart() {
    onClose();
    navigate('/student/cart');
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, background: 'rgba(24,35,55,.35)',
          zIndex: 290, opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity ${T.ease}`,
        }}
      />

      {/* Panel */}
      <aside
        aria-label="Cart"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 360,
          maxWidth: '100vw', background: T.surface, zIndex: 300,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(24,35,55,.12)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: `transform 220ms cubic-bezier(.4,0,.2,1)`,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShoppingBag size={18} color={T.primary} aria-hidden="true" />
            <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Your Cart</span>
            {!isEmpty && (
              <span style={{ background: T.primary, color: '#fff', fontSize: 11, fontWeight: 700,
                padding: '1px 7px', borderRadius: 99 }}>
                {cartItems.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} aria-label="Close cart"
            style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: T.muted, display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: '50%', transition: `background ${T.ease}` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = T.light; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {isEmpty ? (
            <div style={{ textAlign: 'center', padding: '64px 16px', color: T.muted }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
              <p style={{ fontWeight: 700, color: T.text, margin: '0 0 6px' }}>Your cart is empty</p>
              <p style={{ fontSize: 13.5, margin: 0 }}>Browse outlets to add items.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${T.border}`, background: T.surface }}>
            {/* Subtotal row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: T.text2, fontWeight: 500 }}>Subtotal</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: T.text }}>₹{cartAmount}</span>
            </div>
            {/* View full cart */}
            <button onClick={goToCart}
              style={{ width: '100%', height: 46, borderRadius: 12, border: `1.5px solid ${T.primary}`,
                background: T.light, color: T.primary, fontFamily: 'inherit',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10,
                transition: `background ${T.ease}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fce0e7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.light; }}
            >
              View Full Cart
            </button>
            {/* Checkout */}
            <button onClick={onCheckout}
              style={{ width: '100%', height: 50, borderRadius: 12, border: 'none',
                background: T.primary, color: '#fff', fontFamily: 'inherit',
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                transition: `background ${T.ease}, box-shadow ${T.ease}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.dark; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = T.primary; }}
            >
              Checkout · ₹{cartAmount}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
