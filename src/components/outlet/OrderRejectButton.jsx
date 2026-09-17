import React from 'react';
import Button from '../ui/Button.jsx';

export default function OrderRejectButton({ onClick }) {
  return <Button variant="outline" size="sm" onClick={onClick}>Reject</Button>;
}
