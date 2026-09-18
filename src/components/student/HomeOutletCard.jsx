import React from 'react';

/* ── Star icon ──────────────────────────────────────────────────── */
function StarIcon() {
  return (
    <svg
      className="hp-outlet-card__star"
      width="12" height="12" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ── Clock icon ─────────────────────────────────────────────────── */
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" aria-hidden="true"
      style={{ flexShrink: 0, color: 'var(--hp-text-muted)' }}
    >
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

/**
 * HomeOutletCard
 * Props:
 *   outlet  – { id, name, tags, status, rating, prep, address, image? }
 *   onClick – (outlet) => void
 */
export default function HomeOutletCard({ outlet, onClick }) {
  const closed  = outlet.status === 'closed';
  const statusLabel = closed ? 'Closed' : outlet.status === 'busy' ? 'Busy' : 'Open';

  return (
    <article
      className={`hp-outlet-card${closed ? ' hp-outlet-card--closed' : ''}`}
      onClick={() => !closed && onClick && onClick(outlet)}
      role="button"
      tabIndex={closed ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && !closed && onClick && onClick(outlet)}
      aria-label={`${outlet.name}, ${statusLabel}`}
    >
      {/* Image */}
      <div className="hp-outlet-card__img-wrap">
        {outlet.image
          ? <img className="hp-outlet-card__img" src={outlet.image} alt={outlet.name} loading="lazy" />
          : <div className="hp-outlet-card__img-placeholder">🏪</div>
        }
        <span className={`hp-outlet-card__status hp-outlet-card__status--${outlet.status}`}>
          {statusLabel}
        </span>
      </div>

      {/* Body */}
      <div className="hp-outlet-card__body">
        <p className="hp-outlet-card__name">{outlet.name}</p>
        <p className="hp-outlet-card__tags">{outlet.tags}</p>

        <div className="hp-outlet-card__meta">
          <span className="hp-outlet-card__rating">
            <StarIcon />
            {outlet.rating}
          </span>
          <span className="hp-outlet-card__dot" aria-hidden="true" />
          <span className="hp-outlet-card__address">{outlet.address}</span>
        </div>

        <div className="hp-outlet-card__prep">
          <ClockIcon />
          {outlet.prep} prep time
        </div>
      </div>
    </article>
  );
}
