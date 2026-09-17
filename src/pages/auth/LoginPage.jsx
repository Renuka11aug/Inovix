import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Mail } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import PasswordInput from '../../components/auth/PasswordInput.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { useToast } from '../../components/ui/Toast.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { signIn } from '../../services/authService.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignIn(form) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!form.password) {
    errors.password = 'Please enter your password.';
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const errors = useMemo(() => validateSignIn(form), [form]);

  const getError = (field) => (submitted || touched[field] ? errors[field] : '');
  const markTouched = (field) => setTouched((current) => ({ ...current, [field]: true }));
  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (formError) setFormError('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ email: true, password: true });
    setFormError('');

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await signIn(form);
      login('STUDENT');
      toast.success('Welcome back!');
      setTimeout(() => navigate('/student/home'), 350);
    } catch (error) {
      const message = error.code === 'INVALID_CREDENTIALS'
        ? 'Invalid email or password.'
        : 'Something went wrong. Please try again.';
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back!"
      description="Sign in to continue to CampusBite."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="auth-fieldset" disabled={loading}>
          <Input
            id="login-email"
            label="Student Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            value={form.email}
            onChange={updateField('email')}
            onBlur={() => markTouched('email')}
            error={getError('email')}
            success={(submitted || touched.email) && form.email && !errors.email}
            autoComplete="email"
            inputMode="email"
          />

          <PasswordInput
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={updateField('password')}
            onBlur={() => markTouched('password')}
            error={getError('password')}
            autoComplete="current-password"
          />

          <div className="auth-link-row">
            <Link className="auth-link" to="/forgot-password">Forgot Password?</Link>
          </div>

          {formError ? (
            <div className="auth-form-error" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <span>{formError}</span>
            </div>
          ) : null}

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </fieldset>
      </form>

      <div className="auth-divider" aria-hidden="true">OR</div>

      <Button
        type="button"
        variant="google"
        fullWidth
        onClick={() => toast.info('Google sign-in is UI only for now.')}
      >
        <span className="auth-google-mark" aria-hidden="true">G</span>
        Continue with Google
      </Button>

      <p className="auth-bottom-text">
        Don't have an account?{' '}
        <Link className="auth-inline-link" to="/signup">Sign Up</Link>
      </p>
    </AuthLayout>
  );
}
