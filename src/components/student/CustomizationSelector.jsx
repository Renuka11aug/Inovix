import React from 'react';
import Checkbox from '../ui/Checkbox.jsx';
import Radio from '../ui/Radio.jsx';

/** e.g. options = [{ id, label, priceDelta, type: 'checkbox' }], or a single-choice group */
export default function CustomizationSelector({ title, options = [], type = 'checkbox', selected = [], onChange }) {
  const toggle = (id) => {
    if (type === 'radio') { onChange([id]); return; }
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };
  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt) => (
          <div key={opt.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {type === 'radio'
              ? <Radio name={title} label={opt.label} value={opt.id} checked={selected[0] === opt.id} onChange={toggle} />
              : <Checkbox label={opt.label} checked={selected.includes(opt.id)} onChange={() => toggle(opt.id)} />}
            {opt.priceDelta ? <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>+₹{opt.priceDelta}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
