import React from 'react';
import CategoryCard from './CategoryCard.jsx';

export default function CategoryList({ categories = [], activeId, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)', overflowX: 'auto', paddingBottom: 4 }}>
      {categories.map((c) => (
        <CategoryCard key={c.id} label={c.label} icon={c.icon} active={activeId === c.id} onClick={() => onSelect && onSelect(c.id)} />
      ))}
    </div>
  );
}
