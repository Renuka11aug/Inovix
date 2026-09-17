import React, { useState } from 'react';

export default function Tabs({ tabs = [], defaultActive = 0, onChange }) {
  const [active, setActive] = useState(defaultActive);
  const select = (i) => { setActive(i); onChange && onChange(i); };
  return (
    <div>
      <div className="tabs">
        {tabs.map((t, i) => (
          <button key={t.label} className={`tab-btn${active === i ? ' active' : ''}`} onClick={() => select(i)}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs[active] && <div style={{ paddingTop: 'var(--space-4)' }}>{tabs[active].content}</div>}
    </div>
  );
}
