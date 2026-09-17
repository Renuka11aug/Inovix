import React from 'react';

export default function FeaturedSection({ title = 'Featured for you', items = [], onSelect }) {
  return (
    <section style={{ marginBottom: 'var(--space-8)' }}>
      <h3 className="t-h3" style={{ marginBottom: 'var(--space-4)' }}>{title}</h3>
      <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 4 }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect && onSelect(item)}
            style={{
              flex: '0 0 220px', height: 120, borderRadius: 'var(--radius-lg)', cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))',
              display: 'flex', alignItems: 'flex-end', padding: 'var(--space-4)',
              fontWeight: 700, color: 'var(--text-primary)',
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </section>
  );
}
