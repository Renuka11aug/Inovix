import React from 'react';
import Switch from '../ui/Switch.jsx';

export default function AvailabilityToggle({ available, onChange }) {
  return <Switch checked={available} onChange={onChange} label={available ? 'Available' : 'Unavailable'} />;
}
