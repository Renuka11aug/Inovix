import React from 'react';

export default function PickupInstructions({ counter = 'North Quad pickup counter' }) {
  return (
    <div className="alert info">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></svg>
      <span>Show your pickup code or QR at the <strong>{counter}</strong>. No cash or card needed.</span>
    </div>
  );
}
