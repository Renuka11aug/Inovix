import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowRight, X, Clock } from 'lucide-react';

import HomeFoodCard      from '../../components/student/HomeFoodCard';
import HomeOutletCard    from '../../components/student/HomeOutletCard';

import { menuItems, outlets } from '../../mockData';
import './HomePage.css';

const STUDENT_NAME = 'Renuka';
const POPULAR_FOOD = menuItems.filter((i) => i.status !== 'out-of-stock').slice(0, 6);

/* ─── Status config ──────────────────────────────────────────────── */
const STATUS = {
  PLACED:    { label: 'Order Placed',       bg: '#DBEAFE', color: '#1D4ED8', pulse: true  },
  PREPARING: { label: 'Preparing your food',bg: '#FEF3C7', color: '#92400E', pulse: true  },
  READY:     { label: 'Ready for pickup 🎉',bg: '#DCFCE7', color: '#166534', pulse: true  },
  COMPLETED: { label: 'Completed',          bg: '#F3F4F6', color: '#374151', pulse: false },
  CANCELLED: { label: 'Cancelled',          bg: '#FEE2E2', color: '#991B1B', pulse: false },
};

/* ─── Active Order banner (real order from context) ─────────────── */
function ActiveOrderCard({ order, onTrack, onDismiss }) {
  const s = STATUS[order.status?.toUpperCase()] || STATUS.PLACED;

  return (
    <>
      <style>{`
        @keyframes ao-slide-up {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ao-pulse {
          0%,100% { opacity:1; transform:scale(1);    }
          50%      { opacity:.5; transform:scale(1.4); }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          left: 'calc(84px + 20px)',
          right: 20,
          bottom: 40,
          maxWidth: 1100,
          margin: '0 auto',
          zIndex: 250,
          background: '#FFFFFF',
          border: '1.5px solid #F5C9D4',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(180,0,58,.12), 0 2px 8px rgba(24,35,55,.07)',
          animation: 'ao-slide-up 240ms cubic-bezier(.34,1.56,.64,1)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px' }}>

          {/* Icon */}
          <div style={{
            width: 46, height: 46, borderRadius: 10, background: '#FFF1F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }}>
            🏪
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase', color: '#B4003A' }}>
              Current Order
            </span>
            <p style={{ margin: '1px 0 0', fontSize: 14, fontWeight: 700, color: '#182337',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {order.outletName}
            </p>
            <span style={{ fontSize: 11.5, color: '#737C8C', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={11} aria-hidden="true" />
              {order.count} item{order.count !== 1 ? 's' : ''} · ₹{order.total}
            </span>
          </div>

          {/* Pulse dot */}
          {s.pulse && (
            <span aria-hidden="true" style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              flexShrink: 0,
              background: order.status?.toUpperCase() === 'READY' ? '#18B968' : '#D97706',
              animation: 'ao-pulse 1.4s ease-in-out infinite',
            }} />
          )}

          {/* Status badge */}
          <span style={{
            flexShrink: 0, fontSize: 11.5, fontWeight: 700,
            padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap',
            background: s.bg, color: s.color,
          }}>
            {s.label}
          </span>

          {/* Track */}
          <button
            onClick={onTrack}
            style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
              height: 36, padding: '0 14px',
              background: '#B4003A', color: '#fff', border: 'none', borderRadius: 9,
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              whiteSpace: 'nowrap', transition: 'background 150ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#8F002D'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#B4003A'; }}
          >
            Track <ArrowRight size={13} aria-hidden="true" />
          </button>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            aria-label="Dismiss order banner"
            style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: '50%',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9BA5B4', transition: 'background 150ms ease, color 150ms ease', padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#FFF1F3'; e.currentTarget.style.color = '#B4003A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#9BA5B4'; }}
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 767px) {
          [data-active-order-banner] {
            left: 12px !important;
            right: 12px !important;
            bottom: calc(70px + 14px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
      `}</style>
    </>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function SectionHead({ title, onViewAll }) {
  return (
    <div className="hp__section-head">
      <h2 className="hp__section-title">{title}</h2>
      {onViewAll && (
        <button className="hp__view-all" onClick={onViewAll} aria-label={`View all ${title}`}>
          View All →
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HomePage
   ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const navigate = useNavigate();
  const ctx      = useOutletContext();

  /* Real active order from layout context */
  const activeOrder = ctx?.activeOrder ?? null;

  /* Dismissed locally so the user can close the banner for the session */
  const [dismissed, setDismissed] = useState(false);

  /* Re-show banner whenever a new order comes in */
  const prevOrderRef = React.useRef(null);
  if (activeOrder && activeOrder !== prevOrderRef.current) {
    prevOrderRef.current = activeOrder;
    /* New order arrived — reset dismissed so banner appears */
    if (dismissed) setDismissed(false);
  }

  const showBanner = activeOrder !== null && !dismissed;

  const handleAdd = (item) => { if (ctx?.addItem) ctx.addItem(item); };

  return (
    <div className="hp">
      <div className="hp__inner">

        {/* ── 1. GREETING ── */}
        <header className="hp__greeting">
          <h1 className="hp__greeting-title">Welcome back, {STUDENT_NAME} 👋</h1>
          <p className="hp__greeting-sub">Ready for something delicious?</p>
        </header>

        {/* ── 2. POPULAR FOOD ── */}
        <section className="hp__section" aria-label="Popular food">
          <SectionHead title="Popular Food" onViewAll={() => navigate('/student/outlets')} />
          <div className="hp__food-row">
            {POPULAR_FOOD.map((item) => (
              <HomeFoodCard
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onView={() => navigate(`/student/food/${item.id}`)}
              />
            ))}
          </div>
        </section>

        {/* ── 3. POPULAR OUTLETS ── */}
        <section className="hp__section" aria-label="Popular outlets">
          <SectionHead title="Popular Outlets" onViewAll={() => navigate('/student/outlets')} />
          <div className="hp__outlet-row">
            {outlets.map((outlet) => (
              <HomeOutletCard
                key={outlet.id}
                outlet={outlet}
                onClick={(o) => navigate(`/student/outlets/${o.id}`)}
              />
            ))}
          </div>
        </section>

      </div>

      {/* ── Active order banner — only when there is a real in-flight order ── */}
      {showBanner && (
        <ActiveOrderCard
          order={activeOrder}
          onTrack={() => navigate('/student/orders/live')}
          onDismiss={() => setDismissed(true)}
        />
      )}
    </div>
  );
}
