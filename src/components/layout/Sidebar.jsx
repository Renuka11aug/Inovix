import React from 'react';

const icon = (d) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{d}</svg>;

export default function Sidebar({ links = [], activePath }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">N<span>o</span>sh</div>
      {links.map((l) => (
        <a key={l.path} href={l.path} className={`sidebar-link${activePath === l.path ? ' active' : ''}`}>
          {l.icon}
          {l.label}
        </a>
      ))}
    </nav>
  );
}

Sidebar.icon = icon;
