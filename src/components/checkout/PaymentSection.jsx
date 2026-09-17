import React, { useState } from 'react';
import Radio from '../ui/Radio.jsx';

const METHODS = [
  { id: 'wallet', label: 'Campus wallet' },
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Debit / Credit card' },
];

export default function PaymentSection({ selected, onSelect }) {
  const [method, setMethod] = useState(selected || 'wallet');
  const choose = (id) => { setMethod(id); onSelect && onSelect(id); };
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
      <h4 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 'var(--space-4)' }}>Payment method</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {METHODS.map((m) => (
          <Radio key={m.id} name="payment-method" label={m.label} value={m.id} checked={method === m.id} onChange={choose} />
        ))}
      </div>
    </div>
  );
}
