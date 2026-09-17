import React from 'react';

/** Lightweight deterministic pseudo-QR pattern — no external QR library needed. */
export default function PickupQR({ seed = 'NOSH' }) {
  const size = 9;
  const cells = [];
  let s = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) || 1;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < size * size; i++) cells.push(rand() > 0.5);

  return (
    <div className="pickup-qr" style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, padding: 8, gap: 2 }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? 'var(--text-primary)' : 'transparent', borderRadius: 1 }} />
      ))}
    </div>
  );
}
