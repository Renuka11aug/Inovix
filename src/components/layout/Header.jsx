import React from 'react';
import SearchInput from '../ui/SearchInput.jsx';
import Avatar from '../ui/Avatar.jsx';
import NotificationBell from '../notifications/NotificationBell.jsx';

export default function Header({ userName = 'Riya', cartCount = 0, cartAmount = 0, onCartClick, onLogoClick, unreadNotifs = 0 }) {
  return (
    <header className="header">
      <div className="logo" onClick={onLogoClick}>N<span>o</span>sh</div>
      <div style={{ flex: 1, maxWidth: 480 }}>
        <SearchInput value="" onChange={() => {}} placeholder='Search "milk"' />
      </div>
      <div className="header-right">
        <NotificationBell count={unreadNotifs} />
        <button className="cart-pill" onClick={onCartClick} aria-label="View cart" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--primary)', border: 'none', borderRadius: 'var(--radius-md)', padding: '0 var(--space-4)', height: 44 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
          <span className="cart-text"><span className="n">{cartCount} items</span><span className="amt">₹{cartAmount}</span></span>
        </button>
        <Avatar name={userName} />
      </div>
    </header>
  );
}
