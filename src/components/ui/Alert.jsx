import React from 'react';

const icons = {
  info: <circle cx="12" cy="12" r="10" />,
  success: <path d="M8 12l2.5 2.5L16 9" />,
  warning: <path d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a1 1 0 00.9 1.5h18.6a1 1 0 00.9-1.5L13.7 3.9a1 1 0 00-1.7 0z" />,
  error: <path d="M12 8v4m0 4h.01M10.3 3.9L1.8 18a1 1 0 00.9 1.5h18.6a1 1 0 00.9-1.5L13.7 3.9a1 1 0 00-1.7 0z" />,
};

export default function Alert({ variant = 'info', children }) {
  return (
    <div className={`alert ${variant}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {variant === 'info' && <circle cx="12" cy="12" r="10" />}
        {icons[variant]}
      </svg>
      <span>{children}</span>
    </div>
  );
}
