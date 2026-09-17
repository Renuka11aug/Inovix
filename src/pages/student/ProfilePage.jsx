import React from 'react';
import ProfileCard from '../../components/notifications/ProfileCard.jsx';
import ProfileForm from '../../components/notifications/ProfileForm.jsx';
import AccountSettings from '../../components/notifications/AccountSettings.jsx';
import SecuritySettings from '../../components/notifications/SecuritySettings.jsx';
import PageHeader from '../../components/layout/PageHeader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();
  const demoUser = { name: user?.name || 'Riya Sharma', email: user?.email || 'riya@campus.edu', campus: 'North Campus', phone: '' };

  return (
    <div style={{ maxWidth: 520 }}>
      <PageHeader title="Profile" />
      <ProfileCard user={demoUser} />
      <ProfileForm user={demoUser} onSave={() => {}} />
      <AccountSettings />
      <SecuritySettings onChangePassword={() => {}} onLogoutAll={() => {}} />
    </div>
  );
}
