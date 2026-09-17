import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';
import PageContainer from '../components/layout/PageContainer.jsx';
import Footer from '../components/layout/Footer.jsx';
import DemoBar from './DemoBar.jsx';

export default function AdminLayout() {
  const location = useLocation();
  return (
    <>
      <DemoBar />
      <div style={{ display: 'flex' }}>
        <AdminSidebar activePath={location.pathname} />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
      <Footer />
    </>
  );
}
