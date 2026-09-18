import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #E8E4E5',
      background: '#FFFFFF',
      padding: '16px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'center',
      fontFamily: "'Inter', system-ui, sans-serif",
      minHeight: 56,
    }}>

      {/* ── LEFT: logo + brand name ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 26, height: 26, borderRadius: 7, background: '#B4003A', flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M8 4 C8 4 7 2.5 8 1 C9 2.5 8 4 8 4Z"         fill="white" opacity="0.9"/>
            <path d="M12 4 C12 4 11 2.5 12 1 C13 2.5 12 4 12 4Z"  fill="white" opacity="0.9"/>
            <path d="M16 4 C16 4 15 2.5 16 1 C17 2.5 16 4 16 4Z"  fill="white" opacity="0.9"/>
            <path d="M3 10 H21 C21 16 17 20 12 20 C7 20 3 16 3 10Z" fill="white"/>
            <rect x="8" y="20" width="8" height="2" rx="1" fill="white" opacity="0.85"/>
          </svg>
        </span>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 16, fontWeight: 800,
          color: '#B4003A', letterSpacing: '-0.3px',
        }}>
          Nosh
        </span>
      </div>

      {/* ── CENTER: copyright ── */}
      <p style={{
        margin: 0,
        fontSize: 12,
        color: '#9BA5B4',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        © {new Date().getFullYear()} Nosh Campus Food. All rights reserved.
      </p>

      {/* ── RIGHT: links ── */}
      <nav aria-label="Footer links" style={{
        display: 'flex', gap: 20,
        justifyContent: 'flex-end',
      }}>
        {['Help', 'Terms', 'Privacy'].map((label) => (
          <a
            key={label}
            href="#"
            style={{ fontSize: 12.5, fontWeight: 500, color: '#737C8C', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#B4003A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#737C8C'; }}
          >
            {label}
          </a>
        ))}
      </nav>

    </footer>
  );
}
