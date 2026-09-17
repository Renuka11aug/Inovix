import React, { useState } from 'react';
import PasswordInput from './PasswordInput.jsx';
import Button from '../ui/Button.jsx';

export default function ResetPasswordForm({ onSubmit, loading = false }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const mismatch = confirm.length > 0 && password !== confirm;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!mismatch) onSubmit && onSubmit(password); }}>
      <h2 className="t-h3" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>Set a new password</h2>
      <PasswordInput label="New password" value={password} onChange={setPassword} />
      <PasswordInput label="Confirm password" id="confirm" value={confirm} onChange={setConfirm} />
      {mismatch && <p style={{ fontSize: 12, color: 'var(--error)', marginTop: -8, marginBottom: 12 }}>Passwords don't match</p>}
      <Button type="submit" loading={loading} disabled={mismatch} style={{ width: '100%' }}>Update password</Button>
    </form>
  );
}
