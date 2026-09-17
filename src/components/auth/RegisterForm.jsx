import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import PasswordInput from './PasswordInput.jsx';
import Button from '../ui/Button.jsx';

export default function RegisterForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(form); }}>
      <h2 className="t-h3" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>Create your account</h2>
      <Input label="Full name" placeholder="Riya Sharma" value={form.name} onChange={(e) => set('name')(e.target.value)} required />
      <Input label="Campus email" type="email" placeholder="you@campus.edu" value={form.email} onChange={(e) => set('email')(e.target.value)} required />
      <PasswordInput value={form.password} onChange={set('password')} placeholder="Create a password" />
      <Button type="submit" loading={loading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>Create account</Button>
      <div className="login-links" style={{ justifyContent: 'center' }}>
        <a href="/login">Already have an account? Log in</a>
      </div>
    </form>
  );
}
