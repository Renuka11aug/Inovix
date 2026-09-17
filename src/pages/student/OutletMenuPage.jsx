import React, { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import CategoryList from '../../components/student/CategoryList.jsx';
import FoodGrid from '../../components/student/FoodGrid.jsx';
import { outlets, categories, menuItems } from '../../mockData.js';

export default function OutletMenuPage() {
  const { outletSlug } = useParams();
  const navigate = useNavigate();
  const { cart, addItem, incrementItem, decrementItem } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState('popular');

  const outlet = outlets.find((o) => String(o.id) === outletSlug) || outlets[0];
  const filteredItems = menuItems.filter((m) =>
    activeCategory === 'popular' ? true : m.category === activeCategory
  );

  return (
    <div>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginBottom: 16, cursor: 'pointer', fontSize: 13 }}>&larr; Back to outlets</button>
      <h2 className="t-h2" style={{ marginBottom: 4 }}>{outlet.name}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginBottom: 'var(--space-6)' }}>{outlet.tags} · {outlet.prep} prep</p>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <CategoryList categories={categories} activeId={activeCategory} onSelect={setActiveCategory} />
      </div>
      <FoodGrid items={filteredItems} cart={cart} onAdd={addItem} onIncrement={incrementItem} onDecrement={decrementItem} />
    </div>
  );
}
