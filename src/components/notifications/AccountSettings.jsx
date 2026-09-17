import React from 'react';
import Switch from '../ui/Switch.jsx';

export default function AccountSettings({ settings = {}, onChange }) {
  const rows = [
    { key: 'darkMode', label: 'Dark mode', hint: 'Switch to a darker theme' },
    { key: 'autoReorder', label: 'Quick reorder', hint: 'Show your last order on Home' },
  ];
  return (
    <div className="settings-section">
      <h4>Account settings</h4>
      {rows.map((r) => (
        <div key={r.key} className="settings-row">
          <div className="settings-row-text"><p>{r.label}</p><span>{r.hint}</span></div>
          <Switch checked={!!settings[r.key]} onChange={(v) => onChange && onChange(r.key, v)} />
        </div>
      ))}
    </div>
  );
}
