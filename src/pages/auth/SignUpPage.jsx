import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, User } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import PasswordInput from '../../components/auth/PasswordInput.jsx';
import PasswordStrength from '../../components/auth/PasswordStrength.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { useToast } from '../../components/ui/Toast.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { signUp } from '../../services/authService.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  fullName: '',
  email: '',
  studentId: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

function validateSignUp(form) {
  const errors = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!form.studentId.trim()) {
    errors.studentId = 'Student ID is required.';
  }

  if (!form.password || form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!form.confirmPassword || form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!form.terms) {
    errors.terms = 'Please accept the Terms and Privacy Policy.';
  }

  return errors;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => validateSignUp(form), [form]);

  const getError = (field) => (submitted || touched[field] ? errors[field] : '');
  const markTouched = (field) => setTouched((current) => ({ ...current, [field]: true }));
  const updateField = (field) => (event) => {
    const value = field === 'terms' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };
  const isValid = (field) => (submitted || touched[field]) && Boolean(form[field]) && !errors[field];

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      studentId: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await signUp(form);
      login('STUDENT');
      toast.success('Account created successfully');
      setTimeout(() => navigate('/student/home'), 350);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Join CampusBite and enjoy food from your campus."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="auth-fieldset" disabled={loading}>
          <Input
            id="signup-name"
            label="Full Name"
            placeholder="Enter your full name"
            icon={User}
            value={form.fullName}
            onChange={updateField('fullName')}
            onBlur={() => markTouched('fullName')}
            error={getError('fullName')}
            success={isValid('fullName')}
            autoComplete="name"
          />

          <Input
            id="signup-email"
            label="Student Email"
            type="email"
            placeholder="Enter your college email"
            icon={Mail}
            value={form.email}
            onChange={updateField('email')}
            onBlur={() => markTouched('email')}
            error={getError('email')}
            success={isValid('email')}
            autoComplete="email"
            inputMode="email"
          />

          <Input
            id="signup-student-id"
            label="Student ID"
            placeholder="Enter your student ID"
            icon={GraduationCap}
            value={form.studentId}
            onChange={updateField('studentId')}
            onBlur={() => markTouched('studentId')}
            error={getError('studentId')}
            success={isValid('studentId')}
            autoComplete="off"
          />

          <PasswordInput
            id="signup-password"
            label="Password"
            placeholder="Create a password"
            value={form.password}
            onChange={updateField('password')}
            onBlur={() => markTouched('password')}
            error={getError('password')}
            autoComplete="new-password"
          />
          <PasswordStrength password={form.password} />

          <PasswordInput
            id="signup-confirm-password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={updateField('confirmPassword')}
            onBlur={() => markTouched('confirmPassword')}
            error={getError('confirmPassword')}
            autoComplete="new-password"
          />

          <div className="auth-terms">
            <label className="auth-checkbox-row" htmlFor="signup-terms">
              <input
                id="signup-terms"
                type="checkbox"
                checked={form.terms}
                onChange={updateField('terms')}
                onBlur={() => markTouched('terms')}
                aria-describedby={getError('terms') ? 'signup-terms-error' : undefined}
                aria-invalid={getError('terms') ? 'true' : 'false'}
              />
              <span>
                I agree to the{' '}
                <a className="auth-inline-link" href="#" onClick={(event) => event.preventDefault()}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a className="auth-inline-link" href="#" onClick={(event) => event.preventDefault()}>
                  Privacy Policy
                </a>
              </span>
            </label>
            {getError('terms') ? (
              <p id="signup-terms-error" className="auth-error-text" role="alert">
                {getError('terms')}
              </p>
            ) : null}
          </div>

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </fieldset>
      </form>

      <p className="auth-bottom-text">
        Already have an account?{' '}
        <Link className="auth-inline-link" to="/login">Sign In</Link>
      </p>
    </AuthLayout>
  );
}
