import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.jsx';
import SignUpPage from '../pages/auth/SignUpPage.jsx';

function StudentHomeRedirectTarget() {
  return (
    <main style={{
      minHeight: '100svh',
      display: 'grid',
      placeItems: 'center',
      padding: 24,
      background: 'var(--background)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-family)',
      textAlign: 'center',
    }}>
      <div>
        <h1 style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 8 }}>Student Home</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Coming soon.</p>
      </div>
    </main>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/register', element: <Navigate to="/signup" replace /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/student/home', element: <StudentHomeRedirectTarget /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
