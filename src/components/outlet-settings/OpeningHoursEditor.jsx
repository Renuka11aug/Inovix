import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function OpeningHoursEditor({ hours = {}, onChange }) {
  return (
    <div className="settings-section">
      <h4>Opening hours</h4>
      {DAYS.map((day) => {
        const h = hours[day] || { open: '09:00', close: '21:00', closed: false };
        return (
          <div className="hours-row" key={day}>
            <span className="hours-day">{day}</span>
            <input type="time" value={h.open} onChange={(e) => onChange && onChange(day, { ...h, open: e.target.value })} disabled={h.closed} />
            <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>to</span>
            <input type="time" value={h.close} onChange={(e) => onChange && onChange(day, { ...h, close: e.target.value })} disabled={h.closed} />
          </div>
        );
      })}
    </div>
  );
}
