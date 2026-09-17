import React from 'react';

export default function PasswordStrength({ password }) {
  if (!password) return null;

  const getStrength = (p) => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { label: 'Weak', width: '33', className: 'password-strength--weak' };
    if (score <= 3) return { label: 'Medium', width: '66', className: 'password-strength--medium' };
    return { label: 'Strong', width: '100', className: 'password-strength--strong' };
  };

  const strength = getStrength(password);

  return (
    <div className={`password-strength ${strength.className}`} aria-live="polite">
      <div className="password-strength__meta">
        <span>Password strength</span>
        <span className="password-strength__label">{strength.label}</span>
      </div>
      <div className="password-strength__track" aria-hidden="true">
        <div
          className="password-strength__bar"
          style={{ width: `${strength.width}%` }}
        />
      </div>
    </div>
  );
}
