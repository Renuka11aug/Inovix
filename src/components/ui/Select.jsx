import React from 'react';

export default function Select({ label, id, options = [], value, onChange, placeholder }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>}
      <select id={id} className="select-box" value={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
