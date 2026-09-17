import React from 'react';
import Avatar from '../ui/Avatar.jsx';

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <Avatar name={user.name} size={64} src={user.avatar} />
      <div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-sub">{user.email}</div>
        <div className="profile-sub">{user.campus}</div>
      </div>
    </div>
  );
}
