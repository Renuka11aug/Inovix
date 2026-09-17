import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function MenuCategoryForm({ category, onSave, onCancel }) {
  const [name, setName] = useState(category?.name || '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave && onSave({ ...category, name }); }} style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <Input label="Category name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Beverages" />
      <Button type="submit">Save</Button>
      {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>}
    </form>
  );
}
