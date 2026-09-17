import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function ForgotPasswordForm({ onSubmit, loading = false, sent = false }) {
  const [email, setEmail] = useState('');
  if (sent) {
    return <p style={{ fontSize: 14, textAlign: 'center', color: 'var(--text-secondary)' }}>Check <strong>{email}</strong> for a reset link.</p>;
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(email); }}>
      <h2 className="t-h3" style={{ marginBottom: 'var(--space-2)', textAlign: 'center' }}>Reset your password</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>Enter your campus email and we'll send a reset link.</p>
      <Input label="Campus email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" loading={loading} style={{ width: '100%' }}>Send reset link</Button>
    </form>
  );
}
