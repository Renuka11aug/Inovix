import React from 'react';
import Button from '../ui/Button.jsx';

export default function PaymentButton({ amount, onClick, loading }) {
  return <Button onClick={onClick} loading={loading} style={{ width: '100%', height: 52 }}>Pay ₹{amount}</Button>;
}
