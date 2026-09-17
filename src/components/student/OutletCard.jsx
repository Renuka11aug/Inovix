import React from 'react';
import OutletStatus from './OutletStatus.jsx';

export default function OutletCard({ outlet, onClick }) {
  const closed = outlet.status === 'closed';
  return (
    <article
      onClick={() => !closed && onClick && onClick(outlet)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)',
        overflow: 'hidden', boxShadow: 'var(--shadow-sm)', cursor: closed ? 'default' : 'pointer',
        opacity: closed ? 0.7 : 1, filter: closed ? 'grayscale(0.4)' : 'none', transition: 'box-shadow 150ms ease',
      }}
    >
      <div style={{
        height: 120, background: 'linear-gradient(135deg, var(--primary-soft), var(--surface-muted))',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: 'var(--space-3)',
        fontWeight: 700, color: 'var(--text-primary)', position: 'relative',
      }}>
        {outlet.name}
        <div style={{ position: 'absolute', top: 10, right: 10 }}><OutletStatus status={outlet.status} /></div>
      </div>
      <div style={{ padding: 'var(--space-4)' }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 2 }}>{outlet.name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 8 }}>{outlet.tags}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--warning)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            {outlet.rating}
          </span>
          <span>{outlet.prep} prep</span>
        </div>
        <button style={{
          width: '100%', height: 36, borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 700,
          background: closed ? 'var(--surface-muted)' : 'var(--primary)', color: 'var(--text-primary)', border: 'none',
        }}>
          {closed ? 'Closed' : 'View menu'}
        </button>
      </div>
    </article>
  );
}
