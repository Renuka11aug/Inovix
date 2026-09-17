import React from 'react';

export default function Switch({ checked, onChange, disabled = false, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <span className="switch">
        <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked)} />
        <span className="track"><span className="thumb" /></span>
      </span>
      {label && <span style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{label}</span>}
    </label>
  );
}
