import React from 'react';
import '../../styles/theme.css';

export default function AuthLayout({ children, title, description }) {
  return (
    <div className="cb-font" style={{ minHeight: '100vh', display: 'flex' }}>
      {/* LEFT: Branding & Imagery (Desktop Only) */}
      <div 
        className="hidden md:flex md:w-[45%] flex-col justify-between p-12"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          background: 'linear-gradient(135deg, #FFF7F2 0%, #FFEEDD 100%)' 
        }}
      >
        <div style={{ color: 'var(--navy)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>CampusBite</h1>
          <p style={{ marginTop: '16px', fontSize: '24px', fontWeight: 'semibold' }}>
            Good Food.<br />Great Campus.
          </p>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Everything you love to eat, right on your campus.
        </p>
      </div>

      {/* RIGHT: Auth Form */}
      <div className="w-full md:w-[55%] flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="w-full max-w-[420px]">
          {/* Logo on mobile */}
          <div className="md:hidden mb-8 text-center" style={{ color: 'var(--navy)', fontSize: '24px', fontWeight: 'bold' }}>
            CampusBite
          </div>
          
          <div 
            className="p-8 md:p-10"
            style={{ 
              backgroundColor: 'var(--white)', 
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}
          >
            {title && <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{title}</h2>}
            {description && <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>{description}</p>}
            
            <div className="mt-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
