import React from 'react';
import Button from '../ui/Button';

/* ─── Status badge ─────────────────────────────────────────────────── */
const STATUS_META = {
  PLACED:     { label: 'Order Placed',  bg: 'var(--info-light)',    color: 'var(--info)' },
  PREPARING:  { label: 'Preparing',     bg: 'var(--warning-light)', color: 'var(--warning)' },
  READY:      { label: 'Ready',         bg: 'var(--success-light)', color: 'var(--success)' },
  COMPLETED:  { label: 'Completed',     bg: 'var(--success-light)', color: 'var(--success)' },
  CANCELLED:  { label: 'Cancelled',     bg: 'var(--error-light)',   color: 'var(--error)' },
};

function StatusBadge({ status }) {
  if (!status) return null;
  const meta = STATUS_META[status?.toUpperCase()] || {
    label: status, bg: 'var(--surface-muted)', color: 'var(--text-secondary)',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 'var(--radius-full)',
      background: meta.bg, color: meta.color,
      fontSize: 11.5, fontWeight: 700, letterSpacing: 0.2,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: meta.color, flexShrink: 0,
      }} />
      {meta.label}
    </span>
  );
}

/* ─── Food image / emoji thumbnail ────────────────────────────────── */
function FoodThumbnail({ src, alt, icon }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: 72, height: 72, borderRadius: 'var(--radius-md)',
          objectFit: 'cover', flexShrink: 0, background: 'var(--surface-muted)',
        }}
      />
    );
  }
  return (
    <div style={{
      width: 72, height: 72, borderRadius: 'var(--radius-md)',
      background: 'var(--primary-light)', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 30,
    }}>
      {icon || '🍽️'}
    </div>
  );
}

/* ─── Empty state ──────────────────────────────────────────────────── */
function EmptyRecentOrder({ onExplore }) {
  return (
    <div style={{
      border: '1.5px dashed var(--border)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--white)',
      padding: '40px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', gap: 0,
    }}>
      {/* Illustration */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--primary-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 34, marginBottom: 20,
      }}>
        🍽️
      </div>

      <p style={{
        fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
        marginBottom: 8,
      }}>
        No recent orders
      </p>

      <p style={{
        fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
        maxWidth: 280, marginBottom: 24,
      }}>
        Do you want to order something?<br />
        Discover something delicious from your campus.
      </p>

      <Button variant="primary" onClick={onExplore}>
        Explore Food
      </Button>
    </div>
  );
}

/* ─── Order card ───────────────────────────────────────────────────── */
function OrderCard({ order, onOrderAgain }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-sm)',
      padding: '20px 20px',
      display: 'flex', alignItems: 'center', gap: 16,
    }}>
      {/* Thumbnail */}
      <FoodThumbnail src={order.image} alt={order.foodName} icon={order.icon} />

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name + status on same line */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {order.foodName}
          </p>
          {order.status && <StatusBadge status={order.status} />}
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 4px' }}>
          {order.outletName}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            ₹{order.price}
          </span>
          <span style={{
            width: 3, height: 3, borderRadius: '50%',
            background: 'var(--text-muted)', flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Ordered {order.date}
          </span>
        </div>
      </div>

      {/* CTA */}
      <Button size="sm" variant="outline" onClick={onOrderAgain} style={{ flexShrink: 0 }}>
        Order Again
      </Button>
    </div>
  );
}

/* ─── Public export ────────────────────────────────────────────────── */
/**
 * Props:
 *   order       – null | { icon, image, foodName, outletName, price, date, status? }
 *   onOrderAgain – () => void
 *   onExplore    – () => void
 */
export default function RecentOrderCard({ order, onOrderAgain, onExplore }) {
  if (!order) {
    return <EmptyRecentOrder onExplore={onExplore} />;
  }
  return <OrderCard order={order} onOrderAgain={onOrderAgain} />;
}
