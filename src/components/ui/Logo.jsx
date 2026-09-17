import React from 'react';
import { Utensils } from 'lucide-react';

export default function Logo({ size = 'md', className = '' }) {
  const iconSize = size === 'lg' ? 32 : size === 'sm' ? 20 : 24;
  const fontSize = size === 'lg' ? '28px' : size === 'sm' ? '18px' : '22px';

  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{ 
          backgroundColor: 'var(--cb-orange)', 
          padding: size === 'lg' ? '8px' : '6px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <Utensils size={iconSize} />
      </div>
      <span style={{ 
        fontFamily: 'var(--font-inter)', 
        fontWeight: 700, 
        fontSize: fontSize,
        letterSpacing: '-0.02em'
      }}>
        <span style={{ color: 'var(--cb-navy)' }}>Campus</span>
        <span style={{ color: 'var(--cb-orange)' }}>Bite</span>
      </span>
    </div>
  );
}
