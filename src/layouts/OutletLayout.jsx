import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer.jsx';
import Footer from '../components/layout/Footer.jsx';
import Toast from '../components/ui/Toast.jsx';
import DemoBar from './DemoBar.jsx';

export default function OutletLayout() {
  const [toast, setToast] = useState({ show: false, message: '' });
  function showToast(message) { setToast({ show: true, message }); }

  return (
    <>
      <DemoBar />
      <PageContainer>
        <Outlet context={{ showToast }} />
      </PageContainer>
      <Toast message={toast.message} show={toast.show} onHide={() => setToast({ ...toast, show: false })} />
      <Footer />
    </>
  );
}
