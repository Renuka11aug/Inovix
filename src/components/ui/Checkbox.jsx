import React from 'react';

export default function Checkbox({ label, checked, onChange, ...rest }) {
  return (
    <label className="checkbox-row">
      <input type="checkbox" checked={checked} onChange={(e) => onChange && onChange(e.target.checked)} {...rest} />
      {label}
    </label>
  );
}
