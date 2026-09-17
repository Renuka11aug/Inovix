import React from 'react';

export default function Avatar({ name = '', src, size = 36 }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const style = {
    width: size, height: size, borderRadius: '50%',
    background: 'var(--primary-soft)', color: 'var(--text-primary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.38, fontWeight: 700, overflow: 'hidden', flexShrink: 0,
  };
  if (src) return <img src={src} alt={name} style={{ ...style, objectFit: 'cover' }} />;
  return <div style={style}>{initials || 'N'}</div>;
}
