import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────────────── */
const T = {
  primary: '#B4003A', dark: '#8F002D', light: '#FFF1F3',
  surface: '#FFFFFF', bg: '#FAFAFB',
  text: '#182337', text2: '#737C8C', muted: '#9BA5B4',
  border: '#E8E4E5', success: '#18B968',
  radius: 14, ease: '150ms ease',
};

/* ─── Single cart row ────────────────────────────────────────────── */
function CartRow({ item, onIncrement, onDecrement }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0', borderBottom: `1px solid ${T.border}`,
    }}>
      {/* Image */}
      <div style={{
        width: 60, height: 60, borderRadius: 12, overflow: 'hidden',
        flexShrink: 0, background: T.light,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
      }}>
        {item.image
          ? <img src={item.image} alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : '🍽️'}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: T.text,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </p>
        {item.outletName && (
          <p style={{ margin: '2px 0 0', fontSize: 12, color: T.muted }}>{item.outletName}</p>
        )}
        <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: T.text }}>
          ₹{item.price}
          {item.qty > 1 && (
            <span style={{ fontWeight: 400, color: T.muted, marginLeft: 4 }}>× {item.qty}</span>
          )}
        </p>
      </div>

      {/* Qty stepper */}
      <div style={{
        display: 'flex', alignItems: 'center',
        border: `1.5px solid ${T.border}`, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
      }}>
        <button
          onClick={() => onDecrement(item.id)}
          aria-label={item.qty === 1 ? `Remove ${item.name}` : `Decrease ${item.name}`}
          style={{ width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: item.qty === 1 ? T.primary : T.text2, transition: `background ${T.ease}` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.light; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          {item.qty === 1
            ? <Trash2 size={13} aria-hidden="true" />
            : <Minus   size={13} aria-hidden="true" />}
        </button>
        <span style={{
          minWidth: 28, textAlign: 'center', fontSize: 14, fontWeight: 700, color: T.text,
          borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`,
          lineHeight: '34px',
        }}>{item.qty}</span>
        <button
          onClick={() => onIncrement(item.id)}
          aria-label={`Increase ${item.name}`}
          style={{ width: 34, height: 34, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.text2, transition: `background ${T.ease}` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.light; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
        >
          <Plus size={13} aria-hidden="true" />
        </button>
      </div>

      {/* Line total */}
      <span style={{ fontSize: 15, fontWeight: 800, color: T.text, flexShrink: 0, minWidth: 52, textAlign: 'right' }}>
        ₹{item.price * item.qty}
      </span>
    </div>
  );
}

/* ─── Order summary card ─────────────────────────────────────────── */
function Summary({ subtotal, onCheckout }) {
  const fee   = 0;
  const total = subtotal + fee;
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: T.radius, padding: '20px 20px 22px',
    }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: '0 0 16px' }}>Order Summary</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <Row label="Subtotal" value={`₹${subtotal}`} />
        <Row label="Campus service fee" value="Free" valueColor={T.success} />
        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: 0 }} />
        <Row label="Total to pay" value={`₹${total}`} bold />
      </div>

      {/* Info note */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#F0FDF4', border: '1px solid #BBF7D0',
        borderRadius: 9, padding: '9px 12px', marginBottom: 16,
        fontSize: 12.5, color: '#166534', fontWeight: 500,
      }}>
        <span style={{ fontSize: 14 }}>✓</span>
        Pay online now — no cash needed at pickup.
      </div>

      <button
        onClick={onCheckout}
        style={{
          width: '100%', height: 52, borderRadius: 13, border: 'none',
          background: T.primary, color: '#fff',
          fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: `background ${T.ease}, box-shadow ${T.ease}`,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = T.dark; e.currentTarget.style.boxShadow = '0 4px 14px rgba(180,0,58,.28)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = T.primary; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <ShoppingBag size={18} aria-hidden="true" />
        Proceed to Checkout · ₹{total}
      </button>
    </div>
  );
}

function Row({ label, value, bold = false, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13.5, color: bold ? T.text : T.text2, fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: bold ? 800 : 600, color: valueColor || (bold ? T.text : T.text2) }}>{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CartPage
   ═══════════════════════════════════════════════════════════════════ */
export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems = [], cartAmount = 0, incrementItem, decrementItem } = useOutletContext();

  /* Wrapper so stepper can pass id string */
  const inc = (id) => incrementItem({ id });
  const dec = (id) => decrementItem({ id });

  /* Empty state */
  if (cartItems.length === 0) {
    return (
      <div style={{
        background: T.bg, minHeight: '100%',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>🛒</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Your cart is empty</h2>
          <p style={{ fontSize: 14, color: T.text2, margin: '0 0 24px' }}>
            Browse outlets and add items to get started.
          </p>
          <button
            onClick={() => navigate('/student/outlets')}
            style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 11,
              padding: '11px 28px', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, cursor: 'pointer' }}
          >
            Explore Outlets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: T.bg, minHeight: '100%',
      fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: 64,
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: '28px clamp(16px,4vw,48px) 0',
      }}>
        <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: T.text, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
          Your Cart
        </h1>
        <p style={{ fontSize: 14, color: T.muted, margin: '0 0 28px' }}>
          {cartItems.reduce((s, i) => s + i.qty, 0)} item{cartItems.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
        </p>

        {/* Two-column on desktop, stack on mobile */}
        <div className="cp-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 24, alignItems: 'start' }}>

          {/* Items */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: '4px 20px 8px' }}>
            {cartItems.map((item) => (
              <CartRow key={item.id} item={item} onIncrement={inc} onDecrement={dec} />
            ))}
          </div>

          {/* Summary */}
          <Summary subtotal={cartAmount} onCheckout={() => navigate('/student/checkout')} />

        </div>
      </div>

      {/* Responsive: stack summary below items on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .cp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
