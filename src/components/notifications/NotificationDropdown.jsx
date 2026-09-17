import React, { useRef, useEffect } from 'react';
import NotificationList from './NotificationList.jsx';

export default function NotificationDropdown({ notifications = [], onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [onClose]);

  return (
    <div ref={ref} className="dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 320, maxHeight: 360, overflowY: 'auto' }}>
      <div style={{ fontSize: 13, fontWeight: 700, padding: '4px 8px 10px' }}>Notifications</div>
      <NotificationList notifications={notifications} />
    </div>
  );
}
