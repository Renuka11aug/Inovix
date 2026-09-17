import React from 'react';
import { Navigate } from 'react-router-dom';

/** Restricts UI/routes by role, e.g. <RoleGuard role={user.role} allow={['admin']}> */
export default function RoleGuard({ role, allow = [], redirectTo = '/', children }) {
  if (!allow.includes(role)) return <Navigate to={redirectTo} replace />;
  return children;
}
