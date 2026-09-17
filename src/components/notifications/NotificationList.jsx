import React from 'react';
import NotificationItem from './NotificationItem.jsx';
import EmptyState from '../ui/EmptyState.jsx';

export default function NotificationList({ notifications = [] }) {
  if (notifications.length === 0) return <EmptyState title="You're all caught up" />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {notifications.map((n) => <NotificationItem key={n.id} notification={n} />)}
    </div>
  );
}
