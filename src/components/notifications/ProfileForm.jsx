import React, { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function ProfileForm({ user, onSave }) {
  const [form, setForm] = useState(user);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave && onSave(form); }} className="settings-section">
      <h4>Edit profile</h4>
      <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input label="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Button type="submit" style={{ marginTop: 8 }}>Save changes</Button>
    </form>
  );
}
