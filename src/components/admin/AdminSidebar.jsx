import React from 'react';
import Sidebar from '../layout/Sidebar.jsx';

const icon = (d) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;

const LINKS = [
  { path: '/admin', label: 'Dashboard', icon: icon(<path d="M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z" />) },
  { path: '/admin/users', label: 'Users', icon: icon(<><circle cx="9" cy="7" r="4" /><path d="M2 21v-1a7 7 0 0114 0v1M16 3.13a4 4 0 010 7.75M22 21v-1a7 7 0 00-5-6.7" /></>) },
  { path: '/admin/outlets', label: 'Outlets', icon: icon(<path d="M3 9l1-6h16l1 6M4 9v11h16V9M9 21v-6h6v6" />) },
  { path: '/admin/orders', label: 'Orders', icon: icon(<path d="M6 2h12l1 4H5zM5 6l1 14h12l1-14" />) },
  { path: '/admin/payments', label: 'Payments', icon: icon(<><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></>) },
];

export default function AdminSidebar({ activePath }) {
  return <Sidebar links={LINKS} activePath={activePath} />;
}
