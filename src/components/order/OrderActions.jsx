import React from 'react';
import Button from '../ui/Button.jsx';

export default function OrderActions({ status, onCancel, onReorder, onPickedUp }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {status === 'PENDING' && <Button variant="outline" onClick={onCancel}>Cancel order</Button>}
      {status === 'READY' && <Button onClick={onPickedUp} style={{ flex: 1 }}>Order picked up</Button>}
      {status === 'COMPLETED' && <Button variant="secondary" onClick={onReorder}>Reorder</Button>}
    </div>
  );
}
