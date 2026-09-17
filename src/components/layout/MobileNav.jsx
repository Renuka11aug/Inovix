import React from 'react';

const items = [
  { key: 'home', label: 'Home', icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /> },
  { key: 'search', label: 'Search', icon: <circle cx="11" cy="11" r="7" /> },
  { key: 'orders', label: 'Orders', icon: <path d="M6 2h12l1 4H5zM5 6l1 14h12l1-14" /> },
  { key: 'notifications', label: 'Alerts', icon: <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /> },
  { key: 'profile', label: 'Profile', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0116 0v1" /></> },
];

export default function MobileNav({ active = 'home', onChange }) {
  return (
    <nav className="mobile-nav">
      {items.map((it) => (
        <button
          key={it.key}
          className={`mobile-nav-item${active === it.key ? ' active' : ''}`}
          onClick={() => onChange && onChange(it.key)}
          style={{ background: 'none', border: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{it.icon}</svg>
          {it.label}
        </button>
      ))}
    </nav>
  );
}
