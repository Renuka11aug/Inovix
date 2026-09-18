import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { menuItems, outlets } from '../../mockData';

/* ─── Design tokens (inline — no new CSS file needed) ───────────── */
const T = {
  primary:  '#B4003A',
  dark:     '#8F002D',
  light:    '#FFF1F3',
  bg:       '#FAFAFB',
  surface:  '#FFFFFF',
  text:     '#182337',
  text2:    '#737C8C',
  muted:    '#9BA5B4',
  border:   '#E8E4E5',
  success:  '#18B968',
  warning:  '#D97706',
  error:    '#DC2626',
  radius:   14,
  ease:     '150ms ease',
};

/* ─── Toast ──────────────────────────────────────────────────────── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      background: T.text, color: '#fff', padding: '10px 22px',
      borderRadius: 99, fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
      boxShadow: '0 4px 16px rgba(24,35,55,.20)', zIndex: 9999,
      animation: 'fd-toast-in .22s ease',
    }} role="alert">
      {msg}
      <style>{`@keyframes fd-toast-in{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
    </div>
  );
}

/* ─── Veg dot ────────────────────────────────────────────────────── */
function VegDot({ veg }) {
  const c = veg ? '#166534' : '#991B1B';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 18, height: 18, border: `1.5px solid ${c}`, borderRadius: 3,
      background: '#fff', flexShrink: 0,
    }} aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}>
      {veg
        ? <span style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
        : <span style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: `9px solid ${c}` }} />
      }
    </span>
  );
}

/* ─── Customization block ────────────────────────────────────────── */
function Customization({ group, radioValues, checkValues, onRadio, onCheck }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: T.text2, textTransform: 'uppercase', letterSpacing: .8, margin: '0 0 10px' }}>
        {group.label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {group.options.map((opt) => {
          const isRadio   = group.type === 'radio';
          const checked   = isRadio ? radioValues[group.id] === opt.id : checkValues[opt.id] ?? false;
          return (
            <label key={opt.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              border: `1.5px solid ${checked ? T.primary : T.border}`,
              background: checked ? T.light : T.surface,
              transition: `border-color ${T.ease}, background ${T.ease}`,
              fontSize: 14, fontWeight: 500, color: T.text,
            }}>
              <input
                type={isRadio ? 'radio' : 'checkbox'}
                name={group.id}
                value={opt.id}
                checked={checked}
                onChange={() => isRadio ? onRadio(group.id, opt.id) : onCheck(opt.id, !checked)}
                style={{ accentColor: T.primary, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
              />
              <span style={{ flex: 1 }}>{opt.label}</span>
              {opt.price > 0 && (
                <span style={{ fontSize: 13, fontWeight: 700, color: T.primary }}>+₹{opt.price}</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FoodDetails page
   ═══════════════════════════════════════════════════════════════════ */
export default function FoodDetails() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const ctx        = useOutletContext();          /* from StudentLayout */

  const item   = menuItems.find((m) => m.id === id);
  const outlet = item ? outlets.find((o) => o.id === item.outletId) : null;

  /* ── Customization state ── */
  const initRadio = useMemo(() => {
    if (!item) return {};
    const r = {};
    (item.customizations || []).forEach((g) => {
      if (g.type === 'radio' && g.options.length > 0) r[g.id] = g.options[0].id;
    });
    return r;
  }, [item]);

  const [radioValues, setRadio]  = useState(initRadio);
  const [checkValues, setChecks] = useState({});
  const [qty, setQty]            = useState(1);
  const [liked, setLiked]        = useState(false);
  const [toast, setToast]        = useState('');

  /* ── Dynamic price ── */
  const customExtra = useMemo(() => {
    if (!item) return 0;
    let extra = 0;
    (item.customizations || []).forEach((g) => {
      if (g.type === 'radio') {
        const chosen = g.options.find((o) => o.id === radioValues[g.id]);
        extra += chosen?.price ?? 0;
      } else {
        g.options.forEach((o) => { if (checkValues[o.id]) extra += o.price; });
      }
    });
    return extra;
  }, [item, radioValues, checkValues]);

  const unitPrice = item ? item.price + customExtra : 0;
  const total     = unitPrice * qty;

  /* ── Add to cart ── */
  function handleAddToCart() {
    if (!item || item.status === 'out-of-stock') return;

    /* Build a cart key that includes customizations so different configs = different entries */
    const custKey = JSON.stringify({ radio: radioValues, check: checkValues });
    const cartItem = {
      id:             `${item.id}__${btoa(custKey).slice(0, 8)}`,
      foodId:         item.id,
      name:           item.name,
      image:          item.image,
      price:          unitPrice,
      qty,                        /* pass qty directly — addItem reads it */
      customizations: { radio: radioValues, check: checkValues },
      outletId:       item.outletId,
      outletName:     outlet?.name ?? '',
    };

    if (ctx?.addItem) ctx.addItem(cartItem);    /* addItem handles qty > 1 correctly */

    setToast(`"${item.name}" added to cart`);
    setTimeout(() => setToast(''), 2400);
  }

  /* ─── Not found ─── */
  if (!item) {
    return (
      <div style={{ background: T.bg, minHeight: '100%', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Food item not found</h2>
          <p style={{ color: T.text2, margin: '0 0 24px' }}>We couldn't find that item.</p>
          <button onClick={() => navigate('/student/outlets')}
            style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Back to Outlets
          </button>
        </div>
      </div>
    );
  }

  const oos = item.status === 'out-of-stock';

  return (
    <div style={{ background: T.bg, minHeight: '100%', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px clamp(16px,4vw,48px) 0' }}>

        {/* ── Back link ── */}
        <button
          onClick={() => outlet ? navigate(`/student/outlets/${outlet.id}`) : navigate('/student/outlets')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, color: T.text2, padding: 0, marginBottom: 24, transition: `color ${T.ease}` }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.text2; }}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {outlet ? `Back to ${outlet.name}` : 'Back to Outlets'}
        </button>

        {/* ── Two-column layout ── */}
        <div className="fd-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,45%) minmax(0,55%)', gap: 36, alignItems: 'start' }}>

          {/* ── LEFT: image ── */}
          <div style={{ position: 'sticky', top: 96 }}>
            <div style={{ position: 'relative', borderRadius: T.radius + 4, overflow: 'hidden', background: T.light, aspectRatio: '4/3' }}>
              {item.image
                ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>🍽️</div>
              }
              {/* Heart */}
              <button
                onClick={() => setLiked((v) => !v)}
                aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
                style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.12)' }}
              >
                <Heart size={18} fill={liked ? T.primary : 'none'} color={liked ? T.primary : T.text2} />
              </button>
              {/* Discount badge */}
              {item.discount && !oos && (
                <span style={{ position: 'absolute', top: 12, left: 12, background: T.primary, color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 6 }}>
                  {item.discount}
                </span>
              )}
              {oos && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(24,35,55,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: .5 }}>
                  Currently Unavailable
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: details + order panel ── */}
          <div>
            {/* Name + veg */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
              <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: T.text, margin: 0, lineHeight: 1.2, letterSpacing: '-0.3px', flex: 1 }}>
                {item.name}
              </h1>
              <VegDot veg={item.veg} />
            </div>

            {/* Rating */}
            {item.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Star size={14} fill="#F59E0B" color="#F59E0B" aria-hidden="true" />
                <span style={{ fontSize: 13.5, fontWeight: 700, color: T.text }}>{item.rating}</span>
                <span style={{ fontSize: 13, color: T.muted }}>({item.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: '-0.5px' }}>₹{item.price}</span>
              {customExtra > 0 && (
                <span style={{ fontSize: 13.5, color: T.text2, marginLeft: 6 }}>+ ₹{customExtra} extras</span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: 14.5, color: T.text2, lineHeight: 1.6, margin: '0 0 20px' }}>
              {item.desc}
            </p>

            {/* Ingredients */}
            {item.ingredients?.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.text2, textTransform: 'uppercase', letterSpacing: .8, margin: '0 0 10px' }}>Ingredients</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {item.ingredients.map((ing) => (
                    <span key={ing} style={{ padding: '4px 12px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 99, fontSize: 12.5, color: T.text2, fontWeight: 500 }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 24px' }} />

            {/* Customizations */}
            {(item.customizations || []).map((group) => (
              <Customization
                key={group.id}
                group={group}
                radioValues={radioValues}
                checkValues={checkValues}
                onRadio={(gid, oid) => setRadio((r) => ({ ...r, [gid]: oid }))}
                onCheck={(oid, val) => setChecks((c) => ({ ...c, [oid]: val }))}
              />
            ))}

            {(item.customizations || []).length > 0 && (
              <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 24px' }} />
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.text2, textTransform: 'uppercase', letterSpacing: .8 }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `1.5px solid ${T.border}`, borderRadius: 11, overflow: 'hidden' }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: qty <= 1 ? 'not-allowed' : 'pointer', color: qty <= 1 ? T.muted : T.text, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: `background ${T.ease}` }}
                  onMouseEnter={(e) => { if (qty > 1) e.currentTarget.style.background = T.bg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <span style={{ minWidth: 36, textAlign: 'center', fontSize: 15, fontWeight: 700, color: T.text, borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`, lineHeight: '40px' }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: 'pointer', color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: `background ${T.ease}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = T.bg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Total + Add to cart */}
            <div style={{ background: T.light, border: `1.5px solid #F5C9D4`, borderRadius: T.radius, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: T.text2, fontWeight: 600 }}>Total</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: '-0.5px' }}>₹{total}</p>
                {qty > 1 && (
                  <p style={{ margin: 0, fontSize: 12, color: T.muted }}>₹{unitPrice} × {qty}</p>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={oos}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  height: 48, padding: '0 24px',
                  background: oos ? T.border : T.primary,
                  color: oos ? T.muted : '#fff',
                  border: 'none', borderRadius: 12, cursor: oos ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
                  transition: `background ${T.ease}, box-shadow ${T.ease}`,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { if (!oos) e.currentTarget.style.background = T.dark; }}
                onMouseLeave={(e) => { if (!oos) e.currentTarget.style.background = T.primary; }}
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {oos ? 'Unavailable' : 'Add to Cart'}
              </button>
            </div>

          </div>{/* right col */}
        </div>{/* grid */}
      </div>

      {/* ── Mobile: single-column override ── */}
      <style>{`
        @media (max-width: 767px) {
          .fd-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) {
          .fd-grid { gap: 24px !important; }
        }
      `}</style>

      <Toast msg={toast} />
    </div>
  );
}
