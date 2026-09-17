import React from 'react';
import Switch from '../ui/Switch.jsx';

export default function NotificationSettings({ prefs = {}, onChange }) {
  const rows = [
    { key: 'orderUpdates', label: 'Order updates', hint: 'Preparing, ready for pickup, etc.' },
    { key: 'promotions', label: 'Promotions', hint: 'Deals and discounts from outlets' },
    { key: 'campusNews', label: 'Campus news', hint: 'Announcements from Nosh' },
  ];
  return (
    <div className="settings-section">
      <h4>Notification preferences</h4>
      {rows.map((r) => (
        <div key={r.key} className="settings-row">
          <div className="settings-row-text"><p>{r.label}</p><span>{r.hint}</span></div>
          <Switch checked={!!prefs[r.key]} onChange={(v) => onChange && onChange(r.key, v)} />
        </div>
      ))}
    </div>
  );
}
