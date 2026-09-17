import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import Textarea from '../ui/Textarea.jsx';
import Button from '../ui/Button.jsx';

export default function OutletProfileForm({ outlet, onSave }) {
  const [form, setForm] = useState(outlet);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave && onSave(form); }} className="settings-section">
      <h4>Outlet profile</h4>
      <Input label="Outlet name" value={form.name} onChange={(e) => set('name')(e.target.value)} />
      <Input label="Location" value={form.address} onChange={(e) => set('address')(e.target.value)} />
      <Textarea label="Description" rows={3} value={form.desc} onChange={(e) => set('desc')(e.target.value)} />
      <Button type="submit">Save profile</Button>
    </form>
  );
}
