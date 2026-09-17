import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { requestPasswordReset } from '../../services/authService.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForgotPassword(email) {
  if (!email.trim()) return 'Please enter your email.';
  if (!EMAIL_PATTERN.test(email.trim())) return 'Please enter a valid email address.';
  return '';
}

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const error = useMemo(() => validateForgotPassword(email), [email]);
  const visibleError = submitted || touched ? error : '';

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched(true);

    if (error) return;

    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout>
        <div className="auth-success-state">
          <span className="auth-page-icon auth-page-icon--success" aria-hidden="true">
            <CheckCircle size={28} />
          </span>
          <h2 className="auth-title">Reset link sent</h2>
          <p className="auth-description">
            If an account exists with this email, you'll receive instructions to reset your password.
          </p>
          <Button
            type="button"
            fullWidth
            style={{ marginTop: 28 }}
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      description="Enter your registered email and we'll send you instructions to reset your password."
      icon={Mail}
    >
      <Link className="auth-back-link" to="/login">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Sign In
      </Link>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="auth-fieldset" disabled={loading}>
          <Input
            id="forgot-email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched(true)}
            error={visibleError}
            success={(submitted || touched) && email && !error}
            autoComplete="email"
            inputMode="email"
          />

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </fieldset>
      </form>

      <p className="auth-bottom-text">
        Remember your password?{' '}
        <Link className="auth-inline-link" to="/login">Sign In</Link>
      </p>
    </AuthLayout>
  );
}
