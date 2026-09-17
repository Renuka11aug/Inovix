import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import PasswordInput from '../../components/auth/PasswordInput.jsx';
import PasswordStrength from '../../components/auth/PasswordStrength.jsx';
import Button from '../../components/ui/Button.jsx';
import { useToast } from '../../components/ui/Toast.jsx';
import { resetPassword } from '../../services/authService.js';

function validateResetPassword(form) {
  const errors = {};

  if (!form.password || form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!form.confirmPassword || form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => validateResetPassword(form), [form]);

  const getError = (field) => (submitted || touched[field] ? errors[field] : '');
  const markTouched = (field) => setTouched((current) => ({ ...current, [field]: true }));
  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ password: true, confirmPassword: true });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await resetPassword(form.password);
      toast.success('Password reset successfully');
      setSuccess(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthLayout>
        <div className="auth-success-state">
          <span className="auth-page-icon auth-page-icon--success" aria-hidden="true">
            <CheckCircle size={28} />
          </span>
          <h2 className="auth-title">Password reset successfully</h2>
          <p className="auth-description">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Button
            type="button"
            fullWidth
            style={{ marginTop: 28 }}
            onClick={() => navigate('/login')}
          >
            Continue to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      description="Create a new password for your CampusBite account."
    >
      <Link className="auth-back-link" to="/login">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Sign In
      </Link>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="auth-fieldset" disabled={loading}>
          <PasswordInput
            id="reset-password"
            label="New Password"
            placeholder="Enter new password"
            value={form.password}
            onChange={updateField('password')}
            onBlur={() => markTouched('password')}
            error={getError('password')}
            autoComplete="new-password"
          />
          <PasswordStrength password={form.password} />

          <PasswordInput
            id="reset-confirm-password"
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={updateField('confirmPassword')}
            onBlur={() => markTouched('confirmPassword')}
            error={getError('confirmPassword')}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </fieldset>
      </form>
    </AuthLayout>
  );
}
