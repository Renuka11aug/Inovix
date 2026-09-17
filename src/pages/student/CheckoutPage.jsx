import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Checkout from '../../components/checkout/Checkout.jsx';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartByName, activeOutlet, checkout } = useOutletContext();

  return (
    <Checkout
      outlet={activeOutlet}
      cart={cartByName}
      onDone={() => { checkout(); navigate('/'); }}
    />
  );
}
