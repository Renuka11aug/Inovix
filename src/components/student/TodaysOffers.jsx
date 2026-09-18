import React from 'react';

/* ─── Mock offers data ─────────────────────────────────────────────── */
const MOCK_OFFERS = [
  {
    id: 'o1',
    icon: '☕',
    title: '10% off Cold Brew',
    subtitle: 'Brew & Bites · Today only',
    tag: '10% OFF',
    gradient: 'linear-gradient(135deg, #FFF0E9 0%, #FFD9C8 100%)',
    accentColor: 'var(--primary)',
  },
  {
    id: 'o2',
    icon: '🍱',
    title: 'Free dessert with any meal',
    subtitle: 'The Commons · Lunch special',
    tag: 'FREE ITEM',
    gradient: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
    accentColor: 'var(--success)',
  },
  {
    id: 'o3',
    icon: '🌮',
    title: 'Buy 2 wraps, get 1 free',
    subtitle: 'Curry Corner · All day',
    tag: 'B2G1',
    gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
    accentColor: 'var(--info)',
  },
  {
    id: 'o4',
    icon: '🍟',
    title: '₹20 off on orders above ₹200',
    subtitle: 'Wok This Way · Limited time',
    tag: '₹20 OFF',
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    accentColor: 'var(--warning)',
  },
];

/* ─── Single offer card ────────────────────────────────────────────── */
function OfferCard({ offer }) {
  return (
    <article
      style={{
        flexShrink: 0,
        width: 220,
        borderRadius: 'var(--radius-lg)',
        background: offer.gradient,
        border: '1px solid rgba(0,0,0,0.06)',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        cursor: 'pointer',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Tag pill */}
      <span style={{
        alignSelf: 'flex-start',
        background: offer.accentColor,
        color: '#fff',
        fontSize: 10.5,
        fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 'var(--radius-full)',
        letterSpacing: 0.4,
      }}>
        {offer.tag}
      </span>

      {/* Icon */}
      <div style={{ fontSize: 32 }}>{offer.icon}</div>

      {/* Copy */}
      <div>
        <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
          {offer.title}
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.4 }}>
          {offer.subtitle}
        </p>
      </div>
    </article>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */
export default function TodaysOffers({ offers = MOCK_OFFERS }) {
  if (!offers || offers.length === 0) return null;

  return (
    <section style={{ marginBottom: 'var(--space-10)' }}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 'var(--space-5)',
      }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Today's Offers
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
            Deals just for you, available today
          </p>
        </div>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 600, color: 'var(--primary)',
          padding: '4px 0',
        }}>
          View all →
        </button>
      </div>

      {/* Horizontal scroll row */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-4)',
        overflowX: 'auto',
        paddingBottom: 6,
        /* hide scrollbar but keep functionality */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
