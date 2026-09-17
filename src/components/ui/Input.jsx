import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Input({
  label,
  error,
  success = false,
  icon: Icon,
  id,
  type = 'text',
  className = '',
  inputClassName = '',
  helpText,
  rightElement,
  disabled,
  ...rest
}) {
  const reactId = useId();
  const inputId = id || `input-${reactId}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;
  const describedBy = [
    error ? errorId : null,
    helpText ? helpId : null,
    rest['aria-describedby'],
  ].filter(Boolean).join(' ') || undefined;

  const inputClasses = [
    'auth-input',
    Icon ? 'auth-input--with-icon' : '',
    rightElement ? 'auth-input--with-action' : '',
    success && !error ? 'auth-input--success' : '',
    inputClassName,
  ].filter(Boolean).join(' ');

  return (
    <div className={`auth-field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="auth-label">
          {label}
        </label>
      )}
      <div className="auth-input-shell">
        {Icon && (
          <div className="auth-input-icon" aria-hidden="true">
            <Icon size={20} />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...rest}
        />
        {rightElement}
      </div>
      {helpText && !error ? (
        <p id={helpId} className="t-caption" style={{ marginTop: 6 }}>
          {helpText}
        </p>
      ) : null}
      {error && (
        <p id={errorId} className="auth-error-text" role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
