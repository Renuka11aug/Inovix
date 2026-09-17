import React from 'react';
import { Coffee, ShieldCheck, Soup, Utensils } from 'lucide-react';
import '../../styles/auth.css';

export function CampusBiteLogo({ className = '' }) {
  return (
    <div className={`auth-logo ${className}`} aria-label="CampusBite">
      <span className="auth-logo__mark" aria-hidden="true">
        <Utensils size={22} strokeWidth={2.4} />
      </span>
      <span className="auth-logo__word">
        <span className="auth-logo__campus">Campus</span><span className="auth-logo__bite">Bite</span>
      </span>
    </div>
  );
}

function AuthVisual() {
  return (
    <div className="auth-visual" aria-hidden="true">
      <div className="auth-visual-card">
        <div className="auth-food auth-food--bowl">
          <span className="auth-food__icon"><Soup size={23} /></span>
          <span className="auth-food__text">
            <span className="auth-food__label">Fresh bowls</span>
            <span className="auth-food__meta">near your block</span>
          </span>
        </div>

        <div className="auth-food auth-food--coffee">
          <span className="auth-food__icon"><Coffee size={23} /></span>
          <span className="auth-food__text">
            <span className="auth-food__label">Cafe runs</span>
            <span className="auth-food__meta">between classes</span>
          </span>
        </div>

        <div className="auth-campus">
          <span className="auth-campus__window auth-campus__window--left" />
          <span className="auth-campus__window auth-campus__window--right" />
          <span className="auth-campus__door" />
          <span className="auth-campus__steps" />
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({ children, title, description, icon: Icon }) {
  return (
    <main className="auth-shell cb-font">
      <section className="auth-brand-panel" aria-label="CampusBite brand">
        <div className="auth-brand-content">
          <CampusBiteLogo />
          <h1 className="auth-brand-title">Good Food.<br />Great Campus.</h1>
          <p className="auth-brand-copy">Everything you love to eat, right on your campus.</p>
          <AuthVisual />
        </div>

        <div className="auth-brand-footnote">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>Student-first ordering, built for campus life.</span>
        </div>
      </section>

      <section className="auth-form-panel" aria-label="Authentication form">
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <CampusBiteLogo />
          </div>

          <div className="auth-card">
            {(title || description || Icon) && (
              <header className="auth-form-header">
                {Icon ? (
                  <span className="auth-page-icon" aria-hidden="true">
                    <Icon size={25} />
                  </span>
                ) : null}
                {title ? <h2 className="auth-title">{title}</h2> : null}
                {description ? <p className="auth-description">{description}</p> : null}
              </header>
            )}
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
