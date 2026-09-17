import React from 'react';

export default function NotificationItem({ notification }) {
  return (
    <div className={`notif-item${!notification.read ? ' unread' : ''}`}>
      {!notification.read && <span className="notif-item-dot" />}
      <div className="notif-item-text">
        <p>{notification.message}</p>
        <span>{notification.time}</span>
      </div>
    </div>
  );
}
