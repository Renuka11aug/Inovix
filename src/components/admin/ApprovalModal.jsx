import React from 'react';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';

export default function ApprovalModal({ open, onClose, subject, onApprove, onReject }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Review ${subject?.name || 'submission'}`}
      footer={<>
        <Button variant="destructive" onClick={onReject}>Reject</Button>
        <Button variant="primary" onClick={onApprove}>Approve</Button>
      </>}
    >
      Approving will make this outlet visible to students immediately. Rejecting will notify the outlet owner with a reason.
    </Modal>
  );
}
