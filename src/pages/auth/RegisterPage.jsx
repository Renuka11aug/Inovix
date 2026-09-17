import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import { useAuth } from '../../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 2) newErrors.fullName = 'Please enter your full name.';
    if (!formData.email) newErrors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    
    if (!formData.studentId) newErrors.studentId = 'Student ID is required.';
    
    if (!formData.password) newErrors.password = 'Please enter your password.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match.';
    
    if (!formData.terms) newErrors.terms = 'Please accept the Terms and Privacy Policy.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
    login('STUDENT');
    navigate('/student/home');
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 className="cb-h2" style={{ color: 'var(--cb-navy)', marginBottom: '8px' }}>Create your account</h2>
        <p className="cb-body" style={{ color: 'var(--cb-text-secondary)' }}>Join CampusBite and enjoy food from your campus.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          icon={User}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
        />

        <Input
          label="Student Email"
          placeholder="Enter your college email"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="Student ID"
          placeholder="Enter your student ID"
          icon={GraduationCap}
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          error={errors.studentId}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
        />
        
        <PasswordStrength password={formData.password} />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
          <input 
            type="checkbox" 
            id="terms"
            checked={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
            style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: 'var(--cb-orange)' }} 
          />
          <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--cb-text-secondary)', lineHeight: 1.4 }}>
            I agree to the <Link to="#" style={{ color: 'var(--cb-orange)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--cb-orange)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
          </label>
        </div>
        {errors.terms && <p style={{ color: 'var(--cb-error)', fontSize: '13px', marginTop: '-16px', marginBottom: '16px' }}>{errors.terms}</p>}

        <Button type="submit" fullWidth loading={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: 'var(--cb-text-secondary)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--cb-orange)', fontWeight: 700, textDecoration: 'none' }}>
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
