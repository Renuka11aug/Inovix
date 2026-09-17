import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PickupCode from '../../components/order/PickupCode.jsx';
import PickupQR from '../../components/order/PickupQR.jsx';
import PickupInstructions from '../../components/order/PickupInstructions.jsx';

export default function PickupPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 400, textAlign: 'center' }}>
      <button onClick={() => navigate(`/orders/${orderId}`)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginBottom: 16, cursor: 'pointer', fontSize: 13 }}>&larr; Back to order</button>
      <PickupCode code="A7X2" />
      <div style={{ width: 140, height: 140, margin: '24px auto' }}>
        <PickupQR seed={orderId || 'NOSH'} />
      </div>
      <PickupInstructions />
    </div>
  );
}
