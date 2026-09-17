import React from 'react';
import { Navigate } from 'react-router-dom';

/** Blocks unauthenticated routes, redirecting to /login. */
export default function ProtectedRoute({ isAuthenticated, redirectTo = '/login', children }) {
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  return children;
}
