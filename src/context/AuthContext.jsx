import React, { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role = 'STUDENT') => {
    setUser({
      id: 'demo-user',
      name: role === 'STUDENT' ? 'Riya Sharma' : role === 'SUPER_ADMIN' ? 'Admin' : 'Outlet Manager',
      email: role === 'STUDENT' ? 'riya@campus.edu' : role === 'SUPER_ADMIN' ? 'admin@nosh.app' : 'manager@outlet.com',
      role,
      campus: 'North Campus',
      outletId: role === 'OUTLET_STAFF' || role === 'OUTLET_ADMIN' ? 'outlet-1' : null,
    });
  };

  const logout = () => setUser(null);
  const switchRole = (role) => login(role);
  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout, switchRole }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
