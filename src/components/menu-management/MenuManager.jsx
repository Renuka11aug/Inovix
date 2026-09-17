import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader.jsx';
import MenuCategoryList from './MenuCategoryList.jsx';
import MenuItemTable from './MenuItemTable.jsx';
import MenuItemForm from './MenuItemForm.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';

export default function MenuManager({ categories = [], items = [] }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <PageHeader title="Menu management" description="Add, edit and organize your menu" actions={<Button onClick={() => { setEditing(null); setShowForm(true); }}>+ Add item</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--space-6)' }}>
        <MenuCategoryList categories={categories} onAdd={() => {}} />
        <MenuItemTable items={items} onEdit={(it) => { setEditing(it); setShowForm(true); }} />
      </div>
      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit item' : 'Add item'} width={480}>
        <MenuItemForm item={editing} categories={categories.map((c) => c.name)} onSave={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
