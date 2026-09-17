import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import PasswordInput from './PasswordInput.jsx';
import Button from '../ui/Button.jsx';

export default function LoginForm({ onSubmit, loading = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit && onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="t-h3" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>Log in to Nosh</h2>
      <Input label="Campus email" id="email" type="email" placeholder="you@campus.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <PasswordInput value={password} onChange={setPassword} />
      <Button type="submit" variant="primary" loading={loading} style={{ width: '100%', marginTop: 'var(--space-2)' }}>Log in</Button>
      <div className="login-links">
        <a href="/forgot-password">Forgot password?</a>
        <a href="/register">Create account</a>
      </div>
    </form>
  );
}
