import React from 'react';
import AvailabilityToggle from './AvailabilityToggle.jsx';
import Button from '../ui/Button.jsx';

export default function MenuItemTable({ items = [], onEdit, onToggle, onDelete }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr><th>Item</th><th>Category</th><th>Price</th><th>Prep time</th><th>Available</th><th /></tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{it.name}</td>
              <td>{it.category}</td>
              <td>₹{it.price}</td>
              <td>{it.prepTime} min</td>
              <td><AvailabilityToggle available={it.available} onChange={(v) => onToggle && onToggle(it, v)} /></td>
              <td style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="outline" onClick={() => onEdit && onEdit(it)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete && onDelete(it)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
