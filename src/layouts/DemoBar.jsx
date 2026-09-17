import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const APPS = [
  { key: 'student', label: 'Student app', path: '/', role: 'STUDENT' },
  { key: 'outlet', label: 'Outlet dashboard', path: '/outlet/dashboard', role: 'OUTLET_ADMIN' },
  { key: 'admin', label: 'Admin panel', path: '/admin', role: 'SUPER_ADMIN' },
];

export default function DemoBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { switchRole } = useAuth();

  const current = location.pathname.startsWith('/admin')
    ? 'admin'
    : location.pathname.startsWith('/outlet')
    ? 'outlet'
    : 'student';

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: '12px 0', background: 'var(--surface-muted)', borderBottom: '1px solid var(--border-light)' }}>
      {APPS.map((a) => (
        <button
          key={a.key}
          onClick={() => { switchRole(a.role); navigate(a.path); }}
          style={{
            padding: '8px 16px', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            border: current === a.key ? '1.5px solid var(--primary)' : '1px solid var(--border)',
            background: current === a.key ? 'var(--primary-soft)' : 'var(--surface)',
          }}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
