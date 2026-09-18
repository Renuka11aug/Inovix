import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { outlets } from '../../mockData';
import './outlets.css';

const ALL_FILTERS = ['All', 'Open Now', 'North Indian', 'Chinese', 'Fast Food', 'Café', 'Meals', 'Snacks'];

/* ── Inline star SVG ──────────────────────────────────────────────── */
function Star() {
  return (
    <svg className="ol-card__star" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function Clock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

/* ── Single outlet card ───────────────────────────────────────────── */
function OutletCard({ outlet }) {
  const navigate = useNavigate();
  const closed   = outlet.status === 'closed';
  const label    = { open: 'Open', busy: 'Busy', closed: 'Closed' }[outlet.status] ?? 'Open';

  function go() { if (!closed) navigate(`/student/outlets/${outlet.id}`); }

  return (
    <article className={`ol-card${closed ? ' ol-card--closed' : ''}`} onClick={go} role="button" tabIndex={closed ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && go()} aria-label={outlet.name}>

      <div className="ol-card__img-wrap">
        {outlet.image
          ? <img className="ol-card__img" src={outlet.image} alt={outlet.name} loading="lazy" />
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36 }}>🏪</div>
        }
        <span className={`ol-card__status ol-card__status--${outlet.status}`}>{label}</span>
      </div>

      <div className="ol-card__body">
        <p className="ol-card__name">{outlet.name}</p>
        <p className="ol-card__tags">{outlet.tags}</p>
        <div className="ol-card__meta">
          <span className="ol-card__rating"><Star />{outlet.rating}</span>
          <span className="ol-card__dot" aria-hidden="true"/>
          <span style={{ fontSize:12, color:'var(--c-muted)' }}>({outlet.reviews})</span>
          <span className="ol-card__dot" aria-hidden="true"/>
          <span className="ol-card__prep"><Clock />{outlet.prep}</span>
        </div>
        <button className="ol-card__btn" onClick={(e) => { e.stopPropagation(); go(); }} disabled={closed}>
          {closed ? 'Currently Closed' : 'View Menu'}
        </button>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Outlets page
   ═══════════════════════════════════════════════════════════════════ */
export default function Outlets() {
  const [query,      setQuery]      = useState('');
  const [activeFilter, setFilter]   = useState('All');

  const filtered = useMemo(() => {
    let list = outlets;

    if (activeFilter === 'Open Now') {
      list = list.filter((o) => o.status !== 'closed');
    } else if (activeFilter !== 'All') {
      list = list.filter((o) =>
        o.cuisine.some((c) => c.toLowerCase() === activeFilter.toLowerCase()) ||
        o.tags.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((o) =>
        o.name.toLowerCase().includes(q) ||
        o.tags.toLowerCase().includes(q) ||
        o.cuisine.some((c) => c.toLowerCase().includes(q))
      );
    }

    return list;
  }, [query, activeFilter]);

  return (
    <div className="ol">
      <div className="ol__inner">

        {/* Heading */}
        <div className="ol__head">
          <h1 className="ol__title">Campus Outlets</h1>
          <p className="ol__sub">Find your favourite food on campus.</p>
        </div>

        {/* Search */}
        <div className="ol__search">
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search outlets or cuisines…"
            aria-label="Search outlets"
          />
        </div>

        {/* Filter chips */}
        <div className="ol__chips" role="list" aria-label="Filter by category">
          {ALL_FILTERS.map((f) => (
            <button
              key={f}
              role="listitem"
              className={`ol__chip${activeFilter === f ? ' ol__chip--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="ol__grid">
          {filtered.length > 0
            ? filtered.map((o) => <OutletCard key={o.id} outlet={o} />)
            : (
              <div className="ol__empty">
                <div className="ol__empty-icon">🔍</div>
                <h3>No outlets found</h3>
                <p>Try a different search or filter.</p>
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
}
