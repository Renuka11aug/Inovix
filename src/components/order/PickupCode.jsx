import React from 'react';

export default function PickupCode({ code = '4821' }) {
  return (
    <div className="pickup-code-box">
      <div className="pickup-code-label">Pickup code</div>
      <div className="pickup-code-value">{code}</div>
    </div>
  );
}
