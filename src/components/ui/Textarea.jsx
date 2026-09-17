import React from 'react';

export default function Textarea({ label, error, id, className = '', ...rest }) {
  return (
    <div className="field">
      {label && <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>}
      <textarea id={id} className={`textarea-box ${className}`} {...rest} />
      {error && <span style={{ fontSize: 12, color: 'var(--error)' }}>{error}</span>}
    </div>
  );
}
