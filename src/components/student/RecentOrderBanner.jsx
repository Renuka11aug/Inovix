import React, { useState } from 'react';
import { ArrowRight, X, ChevronDown, ChevronUp } from 'lucide-react';

/* ════════════════════════════════════════════════════════════════════
   RecentOrderBanner
   ════════════════════════════════════════════════════════════════════
   Supports both a single order and a stack of multiple active orders.

   Props
   ──────────────────────────────────────────────────────────────────
   orders     Array of order objects  { id, foodName, outletName,
                                        status, image?, placedAt? }
              OR a single order object (backwards-compatible)
   onTrack    (order) => void   — navigate to tracking page
   onDismiss  (orderId) => void — remove one order from the stack
   onDismissAll () => void      — close the whole banner
   ════════════════════════════════════════════════════════════════════ */

/* ─── Status metadata ────────────────────────────────────────────── */
const STATUS_META = {
  PLACED:    { label: 'Order Placed', cls: 'PLACED',    pulse: true  },
  PREPARING: { label: 'Preparing…',  cls: 'PREPARING', pulse: true  },
  READY:     { label: 'Ready! 🎉',   cls: 'READY',     pulse: true  },
  COMPLETED: { label: 'Completed',   cls: 'COMPLETED', pulse: false },
  CANCELLED: { label: 'Cancelled',   cls: 'CANCELLED', pulse: false },
};

function statusMeta(status) {
  return STATUS_META[(status || '').toUpperCase()] || STATUS_META.PLACED;
}

/* ─── Single order row ───────────────────────────────────────────── */
function OrderRow({ order, onTrack, onDismiss, compact = false }) {
  const meta = statusMeta(order.status);

  return (
    <div
      className="rob__row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 10 : 14,
        padding: compact ? '10px 16px' : '12px 18px',
        borderBottom: compact ? '1px solid #F5E8EC' : 'none',
        background: '#fff',
        minWidth: 0,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: compact ? 38 : 46,
        height: compact ? 38 : 46,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
        background: '#FFF1F3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
      }}>
        {order.image
          ? <img src={order.image} alt={order.foodName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : '🥙'}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {!compact && (
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#B4003A' }}>
            Recent Order
          </span>
        )}
        <p style={{ margin: 0, fontSize: compact ? 13 : 14, fontWeight: 700, color: '#182337', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {order.foodName}
        </p>
        <span style={{ fontSize: 11.5, color: '#737C8C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {order.outletName}{order.placedAt ? ` · ${order.placedAt}` : ''}
        </span>
      </div>

      {/* Pulse + badge */}
      {meta.pulse && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 7, height: 7,
            borderRadius: '50%',
            flexShrink: 0,
            background: meta.cls === 'READY' ? '#18B968' : '#D97706',
            animation: 'rob-pulse 1.4s ease-in-out infinite',
          }}
        />
      )}
      <span style={{
        flexShrink: 0,
        fontSize: 11, fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 20,
        whiteSpace: 'nowrap',
        ...(meta.cls === 'PLACED'     && { background: '#DBEAFE', color: '#1D4ED8' }),
        ...(meta.cls === 'PREPARING'  && { background: '#FEF3C7', color: '#92400E' }),
        ...(meta.cls === 'READY'      && { background: '#DCFCE7', color: '#166534' }),
        ...(meta.cls === 'COMPLETED'  && { background: '#F3F4F6', color: '#374151' }),
        ...(meta.cls === 'CANCELLED'  && { background: '#FEE2E2', color: '#991B1B' }),
      }}>
        {meta.label}
      </span>

      {/* Track button */}
      <button
        onClick={() => onTrack && onTrack(order)}
        aria-label={`Track ${order.foodName}`}
        style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 5,
          height: compact ? 32 : 36,
          padding: '0 12px',
          background: '#B4003A', color: '#fff',
          border: 'none', borderRadius: 9,
          cursor: 'pointer',
          fontFamily: 'inherit', fontSize: compact ? 12 : 13, fontWeight: 700,
          whiteSpace: 'nowrap',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#8F002D'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#B4003A'; }}
      >
        Track <ArrowRight size={13} aria-hidden="true" />
      </button>

      {/* Dismiss this row */}
      <button
        onClick={() => onDismiss && onDismiss(order.id)}
        aria-label={`Dismiss ${order.foodName}`}
        style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: '50%',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#9BA5B4', transition: 'background 150ms ease, color 150ms ease',
          padding: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#FFF1F3'; e.currentTarget.style.color = '#B4003A'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none';    e.currentTarget.style.color = '#9BA5B4'; }}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ─── Stacked banner container ───────────────────────────────────── */
export default function RecentOrderBanner({ orders, onTrack, onDismiss, onDismissAll }) {
  /* Backwards-compat: single order object → wrap in array */
  const orderList = Array.isArray(orders) ? orders : (orders ? [orders] : []);

  const [expanded, setExpanded] = useState(false);

  if (orderList.length === 0) return null;

  const topOrder    = orderList[0];
  const extraCount  = orderList.length - 1;
  const hasMultiple = orderList.length > 1;

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes rob-slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rob-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.5; transform: scale(1.35); }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        aria-label="Active orders"
        style={{
          position: 'fixed',
          /* sidebar 84px + 20px gap; right 20px; bottom higher = 40px */
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
          boxShadow: '0 8px 32px rgba(180,0,58,0.12), 0 2px 8px rgba(24,35,55,0.07)',
          animation: 'rob-slide-up 240ms cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* ── When collapsed: show only top order ── */}
        {!expanded && (
          <OrderRow
            order={topOrder}
            onTrack={onTrack}
            onDismiss={onDismiss}
          />
        )}

        {/* ── When expanded: show all orders ── */}
        {expanded && orderList.map((order, i) => (
          <OrderRow
            key={order.id}
            order={order}
            onTrack={onTrack}
            onDismiss={onDismiss}
            compact={i > 0}
          />
        ))}

        {/* ── Footer bar: expand/collapse toggle + count ── */}
        {hasMultiple && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 18px',
              background: '#FFF1F3',
              borderTop: '1px solid #F5C9D4',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setExpanded((v) => !v)}
            role="button"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse orders' : `Show ${extraCount} more order${extraCount > 1 ? 's' : ''}`}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#B4003A' }}>
              {expanded
                ? `${orderList.length} active orders`
                : `+${extraCount} more order${extraCount > 1 ? 's' : ''}`}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Stacked avatar peek (collapsed state only) */}
              {!expanded && (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {orderList.slice(1, 4).map((o, idx) => (
                    <span
                      key={o.id}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 22, height: 22, borderRadius: '50%',
                        overflow: 'hidden', border: '2px solid #FFF1F3',
                        marginLeft: idx === 0 ? 0 : -6,
                        background: '#F5C9D4', fontSize: 10,
                        zIndex: 3 - idx, position: 'relative',
                      }}
                    >
                      {o.image
                        ? <img src={o.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : '🥙'}
                    </span>
                  ))}
                </span>
              )}
              <span style={{ color: '#B4003A' }}>
                {expanded
                  ? <ChevronDown size={15} aria-hidden="true" />
                  : <ChevronUp   size={15} aria-hidden="true" />}
              </span>
            </span>
          </div>
        )}

        {/* ── Dismiss all (only when expanded) ── */}
        {expanded && hasMultiple && (
          <div style={{
            padding: '8px 18px',
            background: '#FAFAFB',
            borderTop: '1px solid #E8E4E5',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <button
              onClick={onDismissAll}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: '#737C8C',
                fontFamily: 'inherit', padding: 0,
                transition: 'color 140ms ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#B4003A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#737C8C'; }}
            >
              Dismiss all
            </button>
          </div>
        )}
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 767px) {
          /* selector matches the banner's fixed container */
          [aria-label="Active orders"] {
            left: 12px !important;
            right: 12px !important;
            bottom: calc(70px + 14px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
      `}</style>
    </>
  );
}
