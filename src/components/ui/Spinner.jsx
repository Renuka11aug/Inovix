import React from 'react';

export default function Spinner({ size = 'md' }) {
  return <span className={`spinner${size === 'lg' ? ' lg' : ''}`} />;
}
