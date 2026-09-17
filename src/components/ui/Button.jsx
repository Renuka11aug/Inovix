import React from 'react';
import { LoaderCircle } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
  style,
  ...rest
}) {
  const classes = [
    'cb-button',
    `cb-button--${variant}`,
    size === 'sm' ? 'cb-button--sm' : '',
    fullWidth ? 'cb-button--full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      style={style}
      aria-busy={loading ? 'true' : undefined}
      {...rest}
    >
      {loading ? <LoaderCircle className="cb-spinner" size={20} aria-hidden="true" /> : Icon ? <Icon size={20} aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}
