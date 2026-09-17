import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import StudentHome from '../../components/student/StudentHome.jsx';
import { outlets } from '../../mockData.js';

export default function HomePage() {
  const navigate = useNavigate();
  const { activeOrder, setActiveOrder } = useOutletContext();

  return (
    <StudentHome
      userName="Riya"
      outlets={outlets}
      activeOrder={activeOrder}
      onSelectOutlet={(o) => navigate(`/outlets/${o.id}`)}
      onDismissOrder={() => setActiveOrder(null)}
    />
  );
}
