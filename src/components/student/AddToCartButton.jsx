import React from 'react';

export default function AddToCartButton({ onClick, disabled = false, label = 'ADD' }) {
  return (
    <button
      className="add-btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 34, padding: '0 18px', fontSize: 12.5, fontWeight: 700,
        background: disabled ? 'var(--disabled)' : 'var(--surface)', color: disabled ? '#fff' : 'var(--primary-hover)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {disabled ? 'Sold out' : label}
    </button>
  );
}
