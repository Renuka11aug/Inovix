import React, { useState } from 'react';
import NotificationDropdown from './NotificationDropdown.jsx';

export default function NotificationBell({ count = 0, notifications = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button className="notif-bell" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
        {count > 0 && <span className="notif-unread-dot" />}
      </button>
      {open && <NotificationDropdown notifications={notifications} onClose={() => setOpen(false)} />}
    </div>
  );
}
