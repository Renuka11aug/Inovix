import React from 'react';
import Button from '../ui/Button.jsx';

export default function MenuCategoryList({ categories = [], onEdit, onDelete, onAdd }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
        <h4 style={{ fontSize: 14, fontWeight: 700 }}>Categories</h4>
        <Button size="sm" onClick={onAdd}>+ Add category</Button>
      </div>
      {categories.map((c) => (
        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 13.5 }}>
          <span>{c.name}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onEdit && onEdit(c)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12.5 }}>Edit</button>
            <button onClick={() => onDelete && onDelete(c)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 12.5 }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
