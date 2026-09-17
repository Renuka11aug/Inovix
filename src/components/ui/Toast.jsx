import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  default: Info,
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const hideToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((message, options = {}) => {
    setToast({
      id: `${Date.now()}-${Math.random()}`,
      message,
      type: options.type || 'success',
      duration: options.duration || 2200,
    });
  }, []);

  const value = useMemo(() => ({
    showToast,
    hideToast,
    success: (message, options) => showToast(message, { ...options, type: 'success' }),
    error: (message, options) => showToast(message, { ...options, type: 'error' }),
    info: (message, options) => showToast(message, { ...options, type: 'info' }),
  }), [hideToast, showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        key={toast?.id || 'toast'}
        message={toast?.message || ''}
        type={toast?.type || 'default'}
        show={!!toast}
        duration={toast?.duration || 2200}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export default function Toast({ message, show, onHide, duration = 1800, type = 'default' }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onHide && onHide(), duration);
    return () => clearTimeout(t);
  }, [show, duration, onHide]);

  const Icon = ICONS[type] || ICONS.default;

  return (
    <div
      className={`cb-toast cb-toast--${type}${show ? ' show' : ''}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <Icon className="cb-toast__icon" size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
