import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';

const T = {
  primary: '#B4003A', dark: '#8F002D', light: '#FFF1F3',
  surface: '#FFFFFF', bg: '#FAFAFB',
  text: '#182337', text2: '#737C8C', muted: '#9BA5B4',
  border: '#E8E4E5', success: '#18B968', successLight: '#F0FDF4',
  radius: 14, ease: '150ms ease',
};

function Row({ label, value, bold = false, large = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: large ? 15 : 13.5, color: bold ? T.text : T.text2, fontWeight: bold ? 700 : 400 }}>
        {label}
      </span>
      <span style={{ fontSize: large ? 16 : 13.5, fontWeight: bold ? 800 : 600, color: bold ? T.text : T.text2 }}>
        {value}
      </span>
    </div>
  );
}

export default function CheckoutPage() {
  const navigate  = useNavigate();
  const { cartItems = [], cartAmount = 0, checkout, showToast } = useOutletContext();

  const [placing, setPlacing] = useState(false);
  const [done,    setDone]    = useState(false);

  /* ── Empty guard — if they land here with no cart ── */
  if (cartItems.length === 0 && !done) {
    return (
      <div style={{ background: T.bg, minHeight: '100%', fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Nothing to checkout</h2>
          <p style={{ color: T.text2, margin: '0 0 20px', fontSize: 14 }}>Add items to your cart first.</p>
          <button onClick={() => navigate('/student/outlets')}
            style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 10,
              padding: '10px 24px', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Explore Outlets
          </button>
        </div>
      </div>
    );
  }

  /* ── Success screen ── */
  if (done) {
    return (
      <div style={{ background: T.bg, minHeight: '100%', fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius + 4,
          padding: '48px 40px', maxWidth: 420, width: '100%', textAlign: 'center',
          boxShadow: '0 4px 24px rgba(24,35,55,.08)',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: T.successLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <CheckCircle2 size={32} color={T.success} aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: '0 0 8px' }}>
            Order Placed! 🎉
          </h1>
          <p style={{ fontSize: 14.5, color: T.text2, margin: '0 0 28px', lineHeight: 1.6 }}>
            Your order has been placed successfully.<br />
            We'll notify you when it's ready for pickup.
          </p>
          <button onClick={() => navigate('/student/orders')}
            style={{ width: '100%', height: 50, borderRadius: 12, border: 'none',
              background: T.primary, color: '#fff', fontFamily: 'inherit',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
            Track Your Order
          </button>
          <button onClick={() => navigate('/student/home')}
            style={{ width: '100%', height: 44, borderRadius: 12,
              border: `1.5px solid ${T.border}`, background: 'none', color: T.text2,
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const total = cartAmount;

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => {
      setDone(true);   /* set done FIRST so the empty-guard never fires */
      checkout();      /* clears cart + fires "Order placed!" toast */
      setPlacing(false);
    }, 900);
  }

  return (
    <div style={{ background: T.bg, minHeight: '100%', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: 64 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px clamp(16px,4vw,48px) 0' }}>

        {/* Back */}
        <button onClick={() => navigate('/student/cart')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600,
            color: T.text2, padding: 0, marginBottom: 24 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.text2; }}
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to Cart
        </button>

        <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: T.text,
          margin: '0 0 24px', letterSpacing: '-0.3px' }}>
          Checkout
        </h1>

        {/* Order items */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.radius, padding: '16px 20px', marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.text2, textTransform: 'uppercase',
            letterSpacing: .8, margin: '0 0 14px' }}>Your Items</p>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 9, overflow: 'hidden',
                flexShrink: 0, background: T.light, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18 }}>
                {item.image
                  ? <img src={item.image} alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : '🍽️'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: T.text,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                {item.outletName && (
                  <p style={{ margin: '1px 0 0', fontSize: 11.5, color: T.muted }}>{item.outletName}</p>
                )}
              </div>
              <span style={{ fontSize: 12.5, color: T.muted, flexShrink: 0 }}>× {item.qty}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.text, flexShrink: 0, minWidth: 44, textAlign: 'right' }}>
                ₹{item.price * item.qty}
              </span>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.radius, padding: '18px 20px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Row label="Subtotal" value={`₹${total}`} />
            <Row label="Campus service fee" value="Free" />
            <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '2px 0' }} />
            <Row label="Total to pay" value={`₹${total}`} bold large />
          </div>
        </div>

        {/* Payment note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.successLight,
          border: '1px solid #BBF7D0', borderRadius: 10, padding: '11px 14px', marginBottom: 24,
          fontSize: 13, color: '#166534', fontWeight: 500 }}>
          <CheckCircle2 size={16} aria-hidden="true" />
          Pickup order — pay online, collect at the outlet counter.
        </div>

        {/* Place order CTA */}
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          style={{ width: '100%', height: 54, borderRadius: 13, border: 'none',
            background: placing ? '#D1A0B0' : T.primary, color: '#fff',
            fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: placing ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            transition: `background ${T.ease}` }}
          onMouseEnter={(e) => { if (!placing) e.currentTarget.style.background = T.dark; }}
          onMouseLeave={(e) => { if (!placing) e.currentTarget.style.background = T.primary; }}
        >
          <ShoppingBag size={19} aria-hidden="true" />
          {placing ? 'Placing Order…' : `Place Order · ₹${total}`}
        </button>

      </div>
    </div>
  );
}
