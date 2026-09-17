import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Select from '../ui/Select.jsx';
import PriceInput from './PriceInput.jsx';
import PreparationTimeInput from './PreparationTimeInput.jsx';
import AvailabilityToggle from './AvailabilityToggle.jsx';
import FoodImageUploader from './FoodImageUploader.jsx';
import Button from '../ui/Button.jsx';

export default function MenuItemForm({ item, categories = [], onSave, onCancel }) {
  const [form, setForm] = useState(item || { name: '', desc: '', price: '', prepTime: '', category: '', available: true });
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave && onSave(form); }}>
      <FoodImageUploader onUpload={() => {}} />
      <Input label="Item name" value={form.name} onChange={(e) => set('name')(e.target.value)} required />
      <Textarea label="Description" rows={3} value={form.desc} onChange={(e) => set('desc')(e.target.value)} />
      <Select label="Category" options={categories.map((c) => ({ value: c, label: c }))} value={form.category} onChange={set('category')} placeholder="Choose category" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <PriceInput value={form.price} onChange={set('price')} />
        <PreparationTimeInput value={form.prepTime} onChange={set('prepTime')} />
      </div>
      <div style={{ margin: '12px 0 20px' }}>
        <AvailabilityToggle available={form.available} onChange={set('available')} />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button type="submit" style={{ flex: 1 }}>Save item</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
