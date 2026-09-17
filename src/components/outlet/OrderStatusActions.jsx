import React from 'react';
import Button from '../ui/Button.jsx';

const NEXT = { ACCEPTED: 'PREPARING', PREPARING: 'READY', READY: 'COMPLETED' };
const NEXT_LABEL = { ACCEPTED: 'Start preparing', PREPARING: 'Mark ready', READY: 'Mark completed' };

export default function OrderStatusActions({ status, onAdvance }) {
  const next = NEXT[status];
  if (!next) return null;
  return <Button onClick={() => onAdvance && onAdvance(next)}>{NEXT_LABEL[status]}</Button>;
}
