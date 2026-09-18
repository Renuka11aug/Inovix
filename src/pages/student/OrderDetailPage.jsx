import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, RefreshCw, Package } from 'lucide-react';
import { orderRows, menuItems, outlets } from '../../mockData.js';

const T = {
  primary: '#B4003A', dark: '#8F002D', light: '#FFF1F3',
  surface: '#FFFFFF', bg: '#FAFAFB',
  text: '#182337', text2: '#737C8C', muted: '#9BA5B4',
  border: '#E8E4E5', success: '#18B968', successLight: '#F0FDF4',
  warning: '#D97706', warningLight: '#FEF3C7',
  radius: 14, ease: '150ms ease',
};

/* ─── Status config ──────────────────────────────────────────────── */
const STATUS_CFG = {
  PLACED:    { label: 'Order Placed',   bg: '#DBEAFE', color: '#1D4ED8', icon: Package },
  PREPARING: { label: 'Preparing',      bg: T.warningLight, color: T.warning, icon: Clock },
  READY:     { label: 'Ready for Pickup 🎉', bg: '#DCFCE7', color: T.success, icon: CheckCircle2 },
  COMPLETED: { label: 'Completed',      bg: '#F3F4F6', color: '#374151', icon: CheckCircle2 },
  CANCELLED: { label: 'Cancelled',      bg: '#FEE2E2', color: '#991B1B', icon: RefreshCw },
};

/* ─── Timeline step ──────────────────────────────────────────────── */
const STEPS = ['PLACED', 'PREPARING', 'READY', 'COMPLETED'];

function Timeline({ status }) {
  const cur = STEPS.indexOf(status?.toUpperCase());
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, margin: '20px 0' }}>
      {STEPS.map((step, i) => {
        const done    = i <= cur;
        const current = i === cur;
        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: done ? T.primary : T.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: current ? `3px solid ${T.dark}` : 'none',
                transition: `background .3s`,
              }}>
                {done && <CheckCircle2 size={14} color="#fff" aria-hidden="true" />}
              </div>
              <span style={{ fontSize: 10.5, fontWeight: done ? 700 : 400,
                color: done ? T.primary : T.muted, textAlign: 'center', whiteSpace: 'nowrap' }}>
                {step[0] + step.slice(1).toLowerCase()}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 2, height: 2, background: i < cur ? T.primary : T.border,
                marginBottom: 18, transition: `background .3s` }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Pickup code card ───────────────────────────────────────────── */
function PickupCard({ code }) {
  return (
    <div style={{ background: T.successLight, border: '1.5px solid #BBF7D0',
      borderRadius: T.radius, padding: '18px 20px', textAlign: 'center', marginBottom: 16 }}>
      <p style={{ margin: '0 0 6px', fontSize: 12.5, fontWeight: 700, color: '#166534',
        textTransform: 'uppercase', letterSpacing: 1 }}>Pickup Code</p>
      <p style={{ margin: 0, fontSize: 40, fontWeight: 800, color: T.text, letterSpacing: 8 }}>{code}</p>
      <p style={{ margin: '8px 0 0', fontSize: 12, color: '#166534' }}>Show this at the outlet counter</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OrderDetailPage
   ═══════════════════════════════════════════════════════════════════ */
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate    = useNavigate();
  const { activeOrder, addItem, showToast } = useOutletContext();

  /* Find order — check live activeOrder first, then mock data */
  const isLive = activeOrder && orderId === 'live';
  const mockRow = orderRows.find((o) => o.id === orderId) || orderRows[0];

  const order = isLive
    ? { id: 'live', outlet: activeOrder.outletName, total: activeOrder.total,
        status: activeOrder.status, pickupCode: 'L1V3', items: [] }
    : { id: mockRow.id, outlet: mockRow.outlet, total: mockRow.total,
        status: mockRow.status, pickupCode: 'A7X2',
        items: menuItems.slice(0, 2).map((m) => ({ ...m, qty: 1 })) };

  const cfg = STATUS_CFG[order.status?.toUpperCase()] || STATUS_CFG.PLACED;
  const StatusIcon = cfg.icon;

  function handleReorder() {
    order.items.forEach((item) => addItem(item));
    showToast('Items added to cart');
    navigate('/student/cart');
  }

  return (
    <div style={{ background: T.bg, minHeight: '100%',
      fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: 64 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '28px clamp(16px,4vw,48px) 0' }}>

        {/* Back */}
        <button onClick={() => navigate('/student/orders')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5,
            fontWeight: 600, color: T.text2, padding: 0, marginBottom: 24 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.text2; }}
        >
          <ArrowLeft size={15} aria-hidden="true" /> Back to Orders
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: '0 0 4px', letterSpacing: '-0.3px' }}>
              {order.outlet}
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Order #{order.id}</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5,
            fontWeight: 700, padding: '6px 12px', borderRadius: 99,
            background: cfg.bg, color: cfg.color }}>
            <StatusIcon size={13} aria-hidden="true" />
            {cfg.label}
          </span>
        </div>

        {/* Timeline */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.radius, padding: '16px 20px', marginBottom: 16 }}>
          <Timeline status={order.status} />
        </div>

        {/* Pickup code (when READY) */}
        {order.status === 'READY' && <PickupCard code={order.pickupCode} />}

        {/* Items (if any) */}
        {order.items.length > 0 && (
          <div style={{ background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: T.radius, padding: '16px 20px', marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: 'uppercase',
              letterSpacing: .8, margin: '0 0 12px' }}>Items</p>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: `1px solid ${T.border}`,
                fontSize: 13.5, color: T.text }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: T.muted }}>× {item.qty} &nbsp; <strong style={{ color: T.text }}>₹{item.price * item.qty}</strong></span>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: T.radius, padding: '14px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: T.text2 }}>Total paid</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>₹{order.total}</span>
          </div>
        </div>

        {/* Reorder */}
        {order.items.length > 0 && (
          <button onClick={handleReorder}
            style={{ width: '100%', height: 50, borderRadius: 12, border: `1.5px solid ${T.primary}`,
              background: T.light, color: T.primary, fontFamily: 'inherit',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <RefreshCw size={16} aria-hidden="true" />
            Reorder
          </button>
        )}

      </div>
    </div>
  );
}
