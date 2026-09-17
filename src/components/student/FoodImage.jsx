import React from 'react';

export default function FoodImage({ src, alt, height = 130 }) {
  if (src) return <img src={src} alt={alt} style={{ width: '100%', height, objectFit: 'cover', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />;
  return (
    <div style={{
      width: '100%', height, borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
      background: 'linear-gradient(135deg, var(--primary-soft), var(--surface-muted))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-muted)', fontSize: 13, fontWeight: 600,
    }}>
      {alt}
    </div>
  );
}
