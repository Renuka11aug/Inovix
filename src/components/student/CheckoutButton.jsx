import React from 'react';
import Button from '../ui/Button.jsx';

export default function CheckoutButton({ total, onClick, loading = false }) {
  return (
    <Button onClick={onClick} loading={loading} style={{ width: '100%', height: 52 }}>
      Pay ₹{total}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
    </Button>
  );
}
