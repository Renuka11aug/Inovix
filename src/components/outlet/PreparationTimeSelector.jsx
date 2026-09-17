import React from 'react';
import Select from '../ui/Select.jsx';

export default function PreparationTimeSelector({ value, onChange }) {
  const options = ['5', '10', '15', '20', '30'].map((m) => ({ value: m, label: `${m} minutes` }));
  return <Select label="Preparation time" options={options} value={value} onChange={onChange} placeholder="Select time" />;
}
