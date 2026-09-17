import React, { useState } from 'react';
import Switch from '../ui/Switch.jsx';
import Select from '../ui/Select.jsx';

export default function OrderSettingsForm({ settings = {}, onChange }) {
  const [maxOrders, setMaxOrders] = useState(settings.maxOrders || '20');
  return (
    <div className="settings-section">
      <h4>Order settings</h4>
      <div className="settings-row">
        <div className="settings-row-text"><p>Accept orders automatically</p><span>Skip manual accept for incoming orders</span></div>
        <Switch checked={!!settings.autoAccept} onChange={(v) => onChange && onChange('autoAccept', v)} />
      </div>
      <div className="settings-row">
        <div className="settings-row-text"><p>Max orders per slot</p><span>Cap concurrent orders during rush hours</span></div>
        <Select options={['10', '20', '30', '50'].map((v) => ({ value: v, label: v }))} value={maxOrders} onChange={(v) => { setMaxOrders(v); onChange && onChange('maxOrders', v); }} />
      </div>
    </div>
  );
}
