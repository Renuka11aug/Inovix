import React, { useState } from 'react';
import Button from '../ui/Button.jsx';

export default function EmailVerification({ email, onVerify, onResend, loading = false }) {
  const [code, setCode] = useState('');
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className="t-h3" style={{ marginBottom: 8 }}>Verify your email</h2>
      <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
        We sent a 6-digit code to <strong>{email}</strong>
      </p>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        className="input-box"
        style={{ textAlign: 'center', fontSize: 20, letterSpacing: '0.4em', marginBottom: 'var(--space-4)' }}
        placeholder="------"
      />
      <Button style={{ width: '100%' }} loading={loading} onClick={() => onVerify && onVerify(code)}>Verify</Button>
      <button onClick={onResend} style={{ marginTop: 'var(--space-4)', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }}>
        Didn't get a code? Resend
      </button>
    </div>
  );
}
