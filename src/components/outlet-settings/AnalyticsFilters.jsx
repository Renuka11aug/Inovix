import React, { useState } from 'react';
import Select from '../ui/Select.jsx';
import DatePicker from '../ui/DatePicker.jsx';

export default function AnalyticsFilters({ onChange }) {
  const [range, setRange] = useState('7d');
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 'var(--space-5)' }}>
      <Select
        label="Date range"
        value={range}
        onChange={(v) => { setRange(v); onChange && onChange({ range: v }); }}
        options={[{ value: '7d', label: 'Last 7 days' }, { value: '30d', label: 'Last 30 days' }, { value: 'custom', label: 'Custom' }]}
      />
      {range === 'custom' && <DatePicker label="From" />}
      {range === 'custom' && <DatePicker label="To" />}
    </div>
  );
}
