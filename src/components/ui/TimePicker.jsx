import React from 'react';

export default function TimePicker({ label, id, value, onChange }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>}
      <input id={id} type="time" className="input-box" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
    </div>
  );
}
