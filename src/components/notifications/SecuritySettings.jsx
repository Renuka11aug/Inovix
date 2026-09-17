import React from 'react';
import Button from '../ui/Button.jsx';

export default function SecuritySettings({ onChangePassword, onLogoutAll }) {
  return (
    <div className="settings-section">
      <h4>Security</h4>
      <div className="settings-row">
        <div className="settings-row-text"><p>Password</p><span>Last changed 3 months ago</span></div>
        <Button variant="outline" size="sm" onClick={onChangePassword}>Change</Button>
      </div>
      <div className="settings-row">
        <div className="settings-row-text"><p>Active sessions</p><span>Log out of all devices</span></div>
        <Button variant="destructive" size="sm" onClick={onLogoutAll}>Log out all</Button>
      </div>
    </div>
  );
}
