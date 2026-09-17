import React from 'react';

export default function Radio({ label, name, value, checked, onChange }) {
  return (
    <label className="radio-row">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange && onChange(value)} />
      {label}
    </label>
  );
}
