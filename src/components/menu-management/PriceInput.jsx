import React from 'react';

export default function PriceInput({ label = 'Price', value, onChange }) {
  return (
    <div className="field">
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 14 }}>₹</span>
        <input type="number" min="0" className="input-box" style={{ paddingLeft: 26 }} value={value} onChange={(e) => onChange && onChange(e.target.value)} />
      </div>
    </div>
  );
}
