import React from 'react';

export default function PreparationTimeInput({ value, onChange }) {
  return (
    <div className="field">
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Preparation time (minutes)</label>
      <input type="number" min="1" className="input-box" value={value} onChange={(e) => onChange && onChange(e.target.value)} />
    </div>
  );
}
