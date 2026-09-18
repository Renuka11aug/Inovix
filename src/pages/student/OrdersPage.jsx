import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { orderRows } from '../../mockData.js';

const T = {
  primary: '#B4003A', light: '#FFF1F3',
  surface: '#FFFFFF', bg: '#FAFAFB',
  text: '#182337', text2: '#737C8C', muted: '#9BA5B4',
  border: '#E8E4E5', radius: 14, ease: '150ms ease',
};

/* ─── Status badge ───────────────────────────────────────────────── */
const STATUS = {
  PLACED:    { label: 'Placed',    bg: '#DBEAFE', color: '#1D4ED8' },
  PREPARING: { label: 'Preparing', bg: '#FEF3C7', color: '#92400E' },
  READY:     { label: 'Ready 🎉', bg: '#DCFCE7', color: '#166534' },
  COMPLETED: { label: 'Completed', bg: '#F3F4F6', color: '#374151' },
  CANCELLED: { label: 'Cancelled', bg: '#FEE2E2', color: '#991B1B' },
};

function StatusBadge({ status }) {
  const s = STATUS[status?.toUpperCase()] || STATUS.PLACED;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
      background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

/* ─── Order card ─────────────────────────────────────────────────── */
function OrderCard({ order, onClick }) {
  return (
    <article
      onClick={() => onClick(order)}
      style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius,
        padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
        transition: `box-shadow ${T.ease}, transform ${T.ease}` }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(24,35,55,.09)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
    >
      {/* Icon */}
      <div style={{ width: 44, height: 44, borderRadius: 11, background: T.light,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
        🏪
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: T.text }}>{order.outlet}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, color: T.muted }}>₹{order.total}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.muted }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: T.muted }}>
            <Clock size={11} aria-hidden="true" /> Today
          </span>
        </div>
      </div>

      <StatusBadge status={order.status} />

      <ArrowRight size={16} color={T.muted} aria-hidden="true" />
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OrdersPage
   ═══════════════════════════════════════════════════════════════════ */
export default function OrdersPage() {
  const navigate = useNavigate();
  /* Also include the in-flight activeOrder from cart context */
  const { activeOrder } = useOutletContext();

  /* Merge mock orders + any live placed order */
  const liveOrders = activeOrder
    ? [{ id: 'live', outlet: activeOrder.outletName, total: activeOrder.total, status: activeOrder.status }]
    : [];
  const allOrders = [...liveOrders, ...orderRows];

  return (
    <div style={{ background: T.bg, minHeight: '100%',
      fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: 64 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px clamp(16px,4vw,48px) 0' }}>

        <h1 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 800, color: T.text,
          margin: '0 0 6px', letterSpacing: '-0.3px' }}>
          Your Orders
        </h1>
        <p style={{ fontSize: 14, color: T.muted, margin: '0 0 28px' }}>
          {allOrders.length} order{allOrders.length !== 1 ? 's' : ''}
        </p>

        {allOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: T.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: '0 0 6px' }}>No orders yet</h3>
            <p style={{ fontSize: 14, margin: '0 0 20px' }}>Place your first order from any campus outlet.</p>
            <button onClick={() => navigate('/student/outlets')}
              style={{ background: T.primary, color: '#fff', border: 'none', borderRadius: 10,
                padding: '10px 24px', fontFamily: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Explore Outlets
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allOrders.map((o) => (
              <OrderCard
                key={o.id}
                order={o}
                onClick={() => navigate(`/student/orders/${o.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
