import React, { useState, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Cart from '../components/student/Cart.jsx';
import Toast from '../components/ui/Toast.jsx';
import { notifications } from '../mockData.js';

/* ─── Page-body layout constants (kept in one place) ─────────────────
   These must stay in sync with Sidebar.css --s-nav-top / --s-collapsed
   and Navbar.css --n-height values.
────────────────────────────────────────────────────────────────────── */
const NAVBAR_H      = 80;   /* px — .cb-nav --n-height          */
const MOBILE_SEARCH = 62;   /* px — .cb-nav-mobile-search height */
const SIDEBAR_W     = 84;   /* px — .cb-sidebar --s-collapsed    */
const BOTTOM_NAV_H  = 70;   /* px — .cb-bottom-nav height        */

const layoutStyles = {
  /* Outer wrapper: sits under the fixed navbar */
  shell: {
    display: 'flex',
    minHeight: `calc(100vh - ${NAVBAR_H}px)`,
    paddingTop: NAVBAR_H,
    background: '#FAFAFB',
  },
  /* Main content area pushed right of the collapsed sidebar */
  content: {
    flex: 1,
    minWidth: 0,
    marginLeft: SIDEBAR_W,   /* collapsed sidebar width */
    display: 'flex',
    flexDirection: 'column',
  },
};

/* Inline <style> block so responsive overrides are in one place and
   don't require a separate CSS file just for layout scaffolding.     */
const LAYOUT_CSS = `
  /* Tablet: sidebar stays collapsed, content margin unchanged */
  @media (max-width: 1023px) {
    .cbl-content { margin-left: ${SIDEBAR_W}px !important; }
  }

  /* Mobile: no sidebar, search row adds top space, bottom-nav adds bottom */
  @media (max-width: 767px) {
    .cbl-shell   { padding-top: ${NAVBAR_H + MOBILE_SEARCH}px !important; }
    .cbl-content {
      margin-left: 0 !important;
      padding-bottom: ${BOTTOM_NAV_H}px;
    }
  }
`;

export default function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ── Cart state ── */
  const [cart, setCart]               = useState({});
  const [activeOutlet, setActiveOutlet] = useState(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toast, setToast]             = useState({ show: false, message: '' });
  const timers = useRef([]);

  function showToast(message) { setToast({ show: true, message }); }

  function addItem(item) {
    /* item.qty can be > 1 when called from FoodDetails with quantity selector */
    const addQty = item.qty || 1;
    setCart((c) => {
      const existing = c[item.id]?.qty || 0;
      return { ...c, [item.id]: { ...item, qty: existing + addQty } };
    });
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

  const cartCount  = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const cartAmount = Object.values(cart).reduce((s, i) => s + i.qty * i.price, 0);
  /* cartItems — ordered array used by CartPage / Cart drawer */
  const cartItems  = Object.values(cart);
  /* cartByName — legacy map used by old components */
  const cartByName = Object.fromEntries(Object.values(cart).map((i) => [i.name, i]));
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  function checkout() {
    setDrawerOpen(false);
    const count = cartCount, total = cartAmount;
    setActiveOrder({ outletName: activeOutlet?.name || 'CampusBite', count, total, status: 'PLACED' });
    setCart({});
    showToast('Order placed!');
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => setActiveOrder((o) => o && { ...o, status: 'PREPARING' }), 3000),
      setTimeout(() => { setActiveOrder((o) => o && { ...o, status: 'READY' }); showToast('Your order is ready!'); }, 7000),
    ];
  }

  function getActiveKey() {
    const p = location.pathname;
    if (p.includes('/outlets'))  return 'outlets';
    if (p.includes('/orders'))   return 'orders';
    if (p.includes('/cart') || p.includes('/checkout')) return 'home'; /* no sidebar item for cart */
    if (p.includes('/settings') || p.includes('/profile')) return 'settings';
    return 'home';
  }
  const activeKey = getActiveKey();

  /* ── Navigation handler ── */
  function handleNavClick(link) { navigate(link.href); }

  /* ── Outlet context ── */
  const ctx = {
    cart, cartItems, cartByName, cartCount, cartAmount,
    addItem, incrementItem, decrementItem,
    cartIncrementByName, cartDecrementByName,
    activeOutlet, setActiveOutlet,
    activeOrder, setActiveOrder,
    drawerOpen, setDrawerOpen,
    checkout, showToast,
  };

  return (
    <>
      {/* Inject responsive layout overrides */}
      <style>{LAYOUT_CSS}</style>

      {/* ── Fixed navbar (+ mobile search row + mobile bottom-nav rendered inside) ── */}
      <Navbar
        role="student"
        activeKey={activeKey}
        cartCount={cartCount}
        notifCount={unreadNotifs}
        onCartClick={() => navigate('/student/cart')}
        onLogoClick={() => navigate('/student/home')}
        onNavClick={handleNavClick}
        onNotifClick={() => {/* TODO: notification panel */}}
        onProfileClick={() => navigate('/student/profile')}
      />

      {/* ── Fixed left sidebar (desktop + tablet) ── */}
      <Sidebar activeKey={activeKey} onNavClick={handleNavClick} />

      {/* ── Page body: offset below navbar and right of sidebar ── */}
      <div className="cbl-shell" style={layoutStyles.shell}>
        <main className="cbl-content" style={layoutStyles.content}>
          <div style={{ flex: 1 }}>
            <Outlet context={ctx} />
          </div>
          <Footer />
        </main>
      </div>

      {/* ── Cart drawer ── */}
      <Cart
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cartItems={cartItems}
        cartAmount={cartAmount}
        onIncrement={(id) => incrementItem({ id })}
        onDecrement={(id) => decrementItem({ id })}
        onCheckout={() => { setDrawerOpen(false); navigate('/student/checkout'); }}
      />

      {/* ── Toast ── */}
      <Toast
        message={toast.message}
        show={toast.show}
        onHide={() => setToast((t) => ({ ...t, show: false }))}
      />
    </>
  );
}
