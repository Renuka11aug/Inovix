import React, { useState } from 'react';
import {
  Bell,
  ShoppingBag,
  User,
  Home,
  Store,
  ClipboardList,
  Search,
  X,
} from 'lucide-react';
import './Navbar.css';

/* ─── Static config (kept for mobile bottom-nav) ────────────────── */
const NAV_LINKS = {
  student: [
    { key: 'home',    label: 'Home',    icon: Home,          href: '/student/home' },
    { key: 'outlets', label: 'Outlets', icon: Store,         href: '/student/outlets' },
    { key: 'orders',  label: 'Orders',  icon: ClipboardList, href: '/student/orders' },
  ],
  outlet: [
    { key: 'dashboard', label: 'Dashboard', icon: Home,          href: '/outlet/dashboard' },
    { key: 'menu',      label: 'Menu',      icon: Store,         href: '/outlet/menu' },
    { key: 'orders',    label: 'Orders',    icon: ClipboardList, href: '/outlet/orders' },
  ],
  admin: [
    { key: 'overview', label: 'Overview', icon: Home,          href: '/admin' },
    { key: 'outlets',  label: 'Outlets',  icon: Store,         href: '/admin/outlets' },
    { key: 'orders',   label: 'Orders',   icon: ClipboardList, href: '/admin/orders' },
  ],
};

/* ─── Logo mark ──────────────────────────────────────────────────── */
function LogoMark() {
  return (
    <span className="cb-nav__mark" aria-hidden="true">
      {/* Bowl with steam — clean food icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {/* Steam wisps */}
        <path d="M8 4 C8 4 7 2.5 8 1 C9 2.5 8 4 8 4Z"   fill="white" opacity="0.85"/>
        <path d="M12 4 C12 4 11 2.5 12 1 C13 2.5 12 4 12 4Z" fill="white" opacity="0.85"/>
        <path d="M16 4 C16 4 15 2.5 16 1 C17 2.5 16 4 16 4Z" fill="white" opacity="0.85"/>
        {/* Bowl */}
        <path d="M3 10 H21 C21 16 17 20 12 20 C7 20 3 16 3 10Z" fill="white"/>
        {/* Base / foot of bowl */}
        <rect x="8" y="20" width="8" height="2" rx="1" fill="white" opacity="0.9"/>
      </svg>
    </span>
  );
}

/* ─── Wordmark ───────────────────────────────────────────────────── */
function Wordmark() {
  return (
    <span className="cb-nav__wordmark" aria-label="Nosh">
      <span className="cb-nav__brand">Nosh</span>
      <span className="cb-nav__tagline" aria-hidden="true">Campus Food</span>
    </span>
  );
}

/* ─── Search bar (desktop, inside navbar) ────────────────────────── */
function NavSearch({ value, onChange }) {
  return (
    <div className="cb-nav__search">
      <div className="cb-nav__search-inner">
        <Search size={15} className="cb-nav__search-icon" aria-hidden="true" />
        <input
          className="cb-nav__search-input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What are you craving today?"
          aria-label="Search food, dishes or outlets"
          autoComplete="off"
        />
        {value && (
          <button
            className="cb-nav__search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <X size={11} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Notification bell ──────────────────────────────────────────── */
function NotifBell({ count = 0, onClick }) {
  return (
    <div className="cb-nav__bell-wrap">
      <button
        className="cb-nav__bell-btn"
        onClick={onClick}
        aria-label={count > 0 ? `${count} unread notifications` : 'Notifications'}
      >
        <Bell size={21} aria-hidden="true" />
      </button>
      {count > 0 && (
        <span className="cb-nav__bell-badge" aria-hidden="true">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
  );
}

/* ─── Cart button ────────────────────────────────────────────────── */
function CartButton({ count = 0, onClick }) {
  return (
    <button
      className="cb-nav__cart"
      onClick={onClick}
      aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
    >
      <ShoppingBag size={18} aria-hidden="true" />
      <span className="cb-nav__cart-label">Cart</span>
      <span className="cb-nav__cart-badge" aria-hidden="true">{count}</span>
    </button>
  );
}

/* ─── Profile button ─────────────────────────────────────────────── */
function ProfileButton({ onClick }) {
  return (
    <button className="cb-nav__profile" onClick={onClick} aria-label="Profile">
      <User size={19} aria-hidden="true" />
    </button>
  );
}

/* ─── Mobile search row (rendered as sibling below <header>) ─────── */
function MobileSearchBar({ value, onChange }) {
  return (
    <div className="cb-nav-mobile-search" role="search" aria-label="Mobile search">
      <div className="cb-nav-mobile-search__inner">
        <Search size={15} style={{ color: 'var(--n-text-muted)', flexShrink: 0 }} aria-hidden="true" />
        <input
          className="cb-nav-mobile-search__input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What are you craving today?"
          aria-label="Search food, dishes or outlets"
          autoComplete="off"
        />
        {value && (
          <button
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--n-text-muted)', display: 'flex', alignItems: 'center',
              padding: 0, flexShrink: 0,
            }}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Mobile bottom navigation bar ──────────────────────────────── */
function MobileBottomNav({ links, activeKey, onNavClick }) {
  return (
    <nav className="cb-bottom-nav" aria-label="Bottom navigation">
      <ul className="cb-bottom-nav__list">
        {links.map((link) => {
          const Icon = link.icon;
          const active = link.key === activeKey;
          return (
            <li key={link.key} className="cb-bottom-nav__item">
              <button
                className={`cb-bottom-nav__btn${active ? ' cb-bottom-nav__btn--active' : ''}`}
                onClick={() => onNavClick(link)}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={22} aria-hidden="true" />
                <span>{link.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main Navbar
   ═══════════════════════════════════════════════════════════════════
   Props
   ──────────────────────────────────────────────────────────────────
   role           'student' | 'outlet' | 'admin'
   activeKey      currently active nav link key
   cartCount      items in cart
   notifCount     unread notifications
   onCartClick    () => void
   onProfileClick () => void
   onNotifClick   () => void
   onNavClick     (link) => void
   onRoleChange   (role) => void
   onLogoClick    () => void
   searchValue    (optional controlled)
   onSearchChange (optional controlled)
   ═══════════════════════════════════════════════════════════════════ */
export default function Navbar({
  role            = 'student',
  activeKey       = 'home',
  cartCount       = 0,
  notifCount      = 0,
  onCartClick,
  onProfileClick,
  onNotifClick,
  onNavClick,
  onLogoClick,
  searchValue:    searchProp,
  onSearchChange: onSearchChangeProp,
}) {
  /* uncontrolled search fallback */
  const [searchInternal, setSearchInternal] = useState('');
  const searchValue    = searchProp    !== undefined ? searchProp    : searchInternal;
  const onSearchChange = onSearchChangeProp !== undefined ? onSearchChangeProp : setSearchInternal;

  const links = NAV_LINKS[role] || NAV_LINKS.student;

  const handleNavClick = (link) => onNavClick && onNavClick(link);

  return (
    <>
      {/* ── Top bar ── */}
      <header className="cb-nav" role="banner">

        {/* Logo */}
        <button className="cb-nav__logo" onClick={onLogoClick} aria-label="CampusBite home">
          <LogoMark />
          <Wordmark />
        </button>

        {/* Search */}
        <NavSearch value={searchValue} onChange={onSearchChange} />

        {/* Actions */}
        <div className="cb-nav__right">
          <NotifBell    count={notifCount} onClick={onNotifClick} />
          <CartButton   count={cartCount}  onClick={onCartClick} />
          <ProfileButton onClick={onProfileClick} />
        </div>

      </header>

      {/* ── Mobile: full-width search row below navbar ── */}
      <MobileSearchBar value={searchValue} onChange={onSearchChange} />

      {/* ── Mobile: bottom navigation ── */}
      <MobileBottomNav links={links} activeKey={activeKey} onNavClick={handleNavClick} />
    </>
  );
}
