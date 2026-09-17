import React, { useState } from 'react';
import OrderSummary from './OrderSummary.jsx';
import PaymentSection from './PaymentSection.jsx';
import PaymentButton from './PaymentButton.jsx';
import PaymentProcessing from './PaymentProcessing.jsx';
import PaymentSuccess from './PaymentSuccess.jsx';
import PaymentFailed from './PaymentFailed.jsx';

/** Full checkout page composing summary + payment + result states. */
export default function Checkout({ outlet, cart = {}, onDone }) {
  const [stage, setStage] = useState('review'); // review | processing | success | failed
  const items = Object.entries(cart);
  const subtotal = items.reduce((s, [, i]) => s + i.qty * i.price, 0);

  function pay() {
    setStage('processing');
    setTimeout(() => setStage(Math.random() > 0.15 ? 'success' : 'failed'), 1500);
  }

  if (stage === 'processing') return <PaymentProcessing />;
  if (stage === 'success') return <PaymentSuccess amount={subtotal} onContinue={onDone} />;
  if (stage === 'failed') return <PaymentFailed onRetry={() => setStage('review')} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 460 }}>
      <OrderSummary outletName={outlet?.name} items={items} subtotal={subtotal} />
      <PaymentSection />
      <PaymentButton amount={subtotal} onClick={pay} />
    </div>
  );
}
