import React from 'react';

export default function DatePicker({ label, id, value, onChange, min, max }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>}
      <input id={id} type="date" className="input-box" value={value} min={min} max={max} onChange={(e) => onChange && onChange(e.target.value)} />
    </div>
  );
}
