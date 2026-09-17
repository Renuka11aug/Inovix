import React from 'react';

const STEPS = ['PLACED', 'PREPARING', 'READY'];
const PCT = { PLACED: 15, PREPARING: 55, READY: 100 };

export default function OrderStatusStepper({ status = 'PLACED' }) {
  const idx = STEPS.indexOf(status);
  return (
    <div>
      <div className="osc-track"><div className="osc-fill" style={{ width: `${PCT[status] || 15}%` }} /></div>
      <div className="osc-steps">
        {STEPS.map((s, i) => (
          <span key={s} className={i <= idx ? 'done' : ''}>{s[0] + s.slice(1).toLowerCase()}</span>
        ))}
      </div>
    </div>
  );
}
