import React, { useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import PageContainer from '../components/layout/PageContainer.jsx';
import Footer from '../components/layout/Footer.jsx';
import Cart from '../components/student/Cart.jsx';
import Toast from '../components/ui/Toast.jsx';
import DemoBar from './DemoBar.jsx';
import { outlets, notifications } from '../mockData.js';

export default function StudentLayout() {
  const navigate = useNavigate();

  // Cart state (mirrors original App.jsx logic)
  const [cart, setCart] = useState({});
  const [activeOutlet, setActiveOutlet] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const timers = useRef([]);

  function showToast(message) { setToast({ show: true, message }); }

  function addItem(item) {
    setCart((c) => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }));
    showToast(`${item.name} added to cart`);
  }
  function incrementItem(item) {
    setCart((c) => ({ ...c, [item.id]: { ...c[item.id], qty: (c[item.id]?.qty || 0) + 1 } }));
  }
  function decrementItem(item) {
    setCart((c) => {
      const next = { ...c };
      if (!next[item.id]) return c;
      const qty = next[item.id].qty - 1;
      if (qty <= 0) delete next[item.id]; else next[item.id] = { ...next[item.id], qty };
      return next;
    });
  }
  function cartIncrementByName(name) { incrementItem({ id: name }); }
  function cartDecrementByName(name) { decrementItem({ id: name }); }

  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const cartAmount = Object.values(cart).reduce((s, i) => s + i.qty * i.price, 0);
  const cartByName = Object.fromEntries(Object.values(cart).map((i) => [i.name, i]));

  function checkout() {
    setDrawerOpen(false);
    const count = cartCount, total = cartAmount;
    setActiveOrder({ outletName: activeOutlet?.name || 'Nosh', count, total, status: 'PLACED' });
    setCart({});
    showToast('Order placed!');
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setActiveOrder((o) => o && { ...o, status: 'PREPARING' }), 3000),
      setTimeout(() => { setActiveOrder((o) => o && { ...o, status: 'READY' }); showToast('Your order is ready!'); }, 7000),
    ];
  }

  const ctx = {
    cart, addItem, incrementItem, decrementItem,
    cartByName, cartCount, cartAmount,
    cartIncrementByName, cartDecrementByName,
    activeOutlet, setActiveOutlet,
    activeOrder, setActiveOrder,
    drawerOpen, setDrawerOpen,
    checkout, showToast,
  };

  return (
    <>
      <DemoBar />
      <Header
        userName="Riya"
        cartCount={cartCount}
        cartAmount={cartAmount}
        onCartClick={() => cartCount > 0 && setDrawerOpen(true)}
        onLogoClick={() => navigate('/')}
        unreadNotifs={notifications.filter((n) => !n.read).length}
      />
      <PageContainer>
        <Outlet context={ctx} />
      </PageContainer>
      <Cart
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        outlet={activeOutlet}
        cart={cartByName}
        onIncrement={cartIncrementByName}
        onDecrement={cartDecrementByName}
        onCheckout={() => { checkout(); navigate('/'); }}
      />
      <Toast message={toast.message} show={toast.show} onHide={() => setToast({ ...toast, show: false })} />
      <Footer />
    </>
  );
}
