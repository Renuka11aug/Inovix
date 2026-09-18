import React from 'react';
import { Home, Store, ClipboardList, Settings } from 'lucide-react';
import './Sidebar.css';

/* ─── Item definitions ───────────────────────────────────────────── */
const MAIN_ITEMS = [
  { key: 'home',    label: 'Home',          icon: Home,          href: '/student/home' },
  { key: 'outlets', label: 'Outlets',       icon: Store,         href: '/student/outlets' },
  { key: 'orders',  label: 'Order History', icon: ClipboardList, href: '/student/orders' },
];

const BOTTOM_ITEMS = [
  { key: 'settings', label: 'Settings', icon: Settings, href: '/student/settings' },
];

/* ─── Single sidebar item ────────────────────────────────────────── */
function SidebarItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      className={`cb-sidebar__item${active ? ' cb-sidebar__item--active' : ''}`}
      onClick={() => onClick && onClick(item)}
      aria-current={active ? 'page' : undefined}
      aria-label={item.label}
    >
      <span className="cb-sidebar__icon">
        <Icon size={20} aria-hidden="true" strokeWidth={active ? 2.4 : 2} />
      </span>
      <span className="cb-sidebar__label">{item.label}</span>
      {/* Tooltip visible only while collapsed */}
      <span className="cb-sidebar__tooltip" aria-hidden="true">{item.label}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Sidebar
   ═══════════════════════════════════════════════════════════════════
   Props
   ──────────────────────────────────────────────────────────────────
   activeKey   key of the currently active item  (default 'home')
   onNavClick  (item) => void
   ═══════════════════════════════════════════════════════════════════ */
export default function Sidebar({ activeKey = 'home', onNavClick }) {
  return (
    <aside className="cb-sidebar" aria-label="Main navigation">

      {/* ── Primary nav items ── */}
      <nav className="cb-sidebar__main">
        {MAIN_ITEMS.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            active={item.key === activeKey}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* ── Settings pinned at bottom ── */}
      <div className="cb-sidebar__bottom">
        {BOTTOM_ITEMS.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            active={item.key === activeKey}
            onClick={onNavClick}
          />
        ))}
      </div>

    </aside>
  );
}
