import React from 'react';

export default function SearchInput({ value, onChange, placeholder = 'Search...', loading = false, onClear }) {
  return (
    <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', height: 44, padding: '0 var(--space-3)', background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 14, flex: 1, color: 'var(--text-primary)' }}
      />
      {loading && <span className="spinner" />}
      {!loading && value && (
        <button onClick={() => onClear ? onClear() : onChange('')} aria-label="Clear search" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 16, cursor: 'pointer' }}>&times;</button>
      )}
    </div>
  );
}
