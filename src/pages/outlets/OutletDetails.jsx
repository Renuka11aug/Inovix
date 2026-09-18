import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { outlets, menuItems } from '../../mockData';
import './outlets.css';

/* ─── Toast ──────────────────────────────────────────────────────── */
function Toast({ message }) {
  return message ? <div className="od__toast" role="alert">{message}</div> : null;
}

/* ─── Veg / non-veg dot ──────────────────────────────────────────── */
function VegDot({ veg }) {
  return <span className={`od-item__veg od-item__veg--${veg ? 'veg' : 'nonveg'}`} aria-label={veg ? 'Veg' : 'Non-veg'} />;
}

/* ─── Single menu item card ──────────────────────────────────────── */
function MenuItem({ item, onAdd, onView }) {
  const oos = item.status === 'out-of-stock';
  return (
    <article
      className="od-item"
      onClick={!oos ? onView : undefined}
      style={{ cursor: !oos ? 'pointer' : 'default' }}
    >
      <div className="od-item__img-wrap">
        {item.image
          ? <img className="od-item__img" src={item.image} alt={item.name} loading="lazy" />
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>🍽️</div>
        }
        {oos && <div className="od-item__oos-overlay">Unavailable</div>}
        {item.discount && !oos && <span className="od-item__badge">{item.discount}</span>}
        <VegDot veg={item.veg} />
      </div>
      <div className="od-item__body">
        <p className="od-item__name">{item.name}</p>
        <p className="od-item__desc">{item.desc}</p>
        <div className="od-item__foot">
          <span className="od-item__price">₹{item.price}</span>
          <button
            className="od-item__add"
            onClick={(e) => { e.stopPropagation(); if (!oos) onAdd(item); }}
            disabled={oos}
            aria-label={`Add ${item.name} to cart`}
          >+</button>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OutletDetails page
   ═══════════════════════════════════════════════════════════════════ */
export default function OutletDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const ctx      = useOutletContext();          /* cart context from StudentLayout */

  const outlet     = outlets.find((o) => o.id === id);
  const items      = useMemo(() => menuItems.filter((m) => m.outletId === id), [id]);
  const categories = useMemo(() => ['All', ...new Set(items.map((m) => m.category))], [items]);

  const [activeCategory, setCategory] = useState('All');
  const [toast, setToast]             = useState('');

  /* ── Add directly to shared cart + show toast ── */
  const handleAdd = useCallback((item) => {
    if (ctx?.addItem) ctx.addItem(item);
    setToast(`Added "${item.name}" to cart`);
    setTimeout(() => setToast(''), 2400);
  }, [ctx]);

  /* ── Outlet not found ── */
  if (!outlet) {
    return (
      <div className="od">
        <div className="od__inner" style={{ textAlign:'center', paddingTop:80 }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🏪</div>
          <h2 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Outlet not found</h2>
          <p style={{ color:'var(--c-text2)', marginBottom:24 }}>We couldn't find that outlet.</p>
          <button className="od__back" onClick={() => navigate('/student/outlets')}>
            ← Back to Outlets
          </button>
        </div>
      </div>
    );
  }

  const statusLabel = { open:'Open', busy:'Busy', closed:'Closed' }[outlet.status] ?? 'Open';

  const visibleItems = activeCategory === 'All'
    ? items
    : items.filter((m) => m.category === activeCategory);

  const grouped = useMemo(() => {
    if (activeCategory !== 'All') return null;
    const map = {};
    items.forEach((m) => {
      if (!map[m.category]) map[m.category] = [];
      map[m.category].push(m);
    });
    return map;
  }, [items, activeCategory]);

  return (
    <div className="od">
      <div className="od__inner">

        {/* Back */}
        <button className="od__back" onClick={() => navigate('/student/outlets')}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to Outlets
        </button>

        {/* Banner */}
        <div className="od__banner">
          {outlet.image && <img src={outlet.image} alt={outlet.name} />}
          <div className="od__banner-overlay" />
        </div>

        {/* Info */}
        <div className="od__info">
          <div>
            <h1 className="od__name">{outlet.name}</h1>
            <div className="od__meta">
              <span className="od__rating">
                <Star size={13} fill="#F59E0B" color="#F59E0B" aria-hidden="true" />
                {outlet.rating}
                <span style={{ color:'var(--c-muted)', fontWeight:400 }}>({outlet.reviews})</span>
              </span>
              <span className="od__dot" aria-hidden="true" />
              <span className={`od__status-badge od__status-badge--${outlet.status}`}>{statusLabel}</span>
              <span className="od__dot" aria-hidden="true" />
              <span className="od__prep"><Clock size={13} aria-hidden="true" />{outlet.prep}</span>
              <span className="od__dot" aria-hidden="true" />
              <span className="od__cuisine">{outlet.cuisine.join(' · ')}</span>
            </div>
          </div>
        </div>

        {outlet.status === 'closed' && (
          <div className="od__closed-banner">
            ⚠️ This outlet is currently closed. You can still browse the menu.
          </div>
        )}

      </div>

      {/* ── Sticky category bar ── */}
      <div className="od__cats" role="navigation" aria-label="Menu categories">
        <div className="od__cats-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`od__cat-btn${activeCategory === cat ? ' od__cat-btn--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu ── */}
      <div className="od__inner">
        {items.length === 0 ? (
          <div style={{ textAlign:'center', padding:'64px 24px', color:'var(--c-text2)' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🍽️</div>
            <h3 style={{ fontSize:17, fontWeight:700, color:'var(--c-text)', margin:'0 0 6px' }}>No items available</h3>
            <p style={{ fontSize:14, margin:0 }}>This outlet hasn't added any menu items yet.</p>
          </div>
        ) : activeCategory === 'All' && grouped ? (
          Object.entries(grouped).map(([cat, catItems]) => (
            <section key={cat}>
              <h2 className="od__section-head">{cat}</h2>
              <div className="od__menu-grid">
                {catItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={handleAdd}
                    onView={() => navigate(`/student/food/${item.id}`)}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="od__menu-grid">
            {visibleItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onView={() => navigate(`/student/food/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <Toast message={toast} />
    </div>
  );
}
