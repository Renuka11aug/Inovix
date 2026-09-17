import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import EmailVerification from '../../components/auth/EmailVerification.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function VerifyPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  return (
    <AuthLayout>
      <EmailVerification
        email="you@campus.edu"
        onVerify={() => { login('STUDENT'); navigate('/'); }}
        onResend={() => {}}
      />
    </AuthLayout>
  );
}
