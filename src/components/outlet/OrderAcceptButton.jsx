import React from 'react';
import Button from '../ui/Button.jsx';

export default function OrderAcceptButton({ onClick }) {
  return <Button variant="primary" size="sm" onClick={onClick}>Accept</Button>;
}
