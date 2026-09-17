import React, { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Radio from '../ui/Radio.jsx';
import Button from '../ui/Button.jsx';

const REASONS = ['Item out of stock', 'Kitchen too busy', 'Closing soon', 'Other'];

export default function RejectOrderModal({ open, onClose, onConfirm }) {
  const [reason, setReason] = useState(REASONS[0]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Reject order"
      footer={<>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="destructive" onClick={() => onConfirm && onConfirm(reason)}>Reject order</Button>
      </>}
    >
      <p style={{ marginBottom: 12 }}>Select a reason for the student:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {REASONS.map((r) => <Radio key={r} name="reject-reason" label={r} value={r} checked={reason === r} onChange={setReason} />)}
      </div>
    </Modal>
  );
}
