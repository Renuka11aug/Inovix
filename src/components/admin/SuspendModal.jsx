import React, { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Textarea from '../ui/Textarea.jsx';
import Button from '../ui/Button.jsx';

export default function SuspendModal({ open, onClose, subject, onConfirm }) {
  const [reason, setReason] = useState('');
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Suspend ${subject?.name || 'account'}`}
      footer={<>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="destructive" onClick={() => onConfirm && onConfirm(reason)}>Suspend</Button>
      </>}
    >
      <Textarea label="Reason (visible to the account holder)" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
    </Modal>
  );
}
