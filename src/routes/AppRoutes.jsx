import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ForgotPasswordPage  from '../pages/auth/ForgotPasswordPage.jsx';
import LoginPage           from '../pages/auth/LoginPage.jsx';
import ResetPasswordPage   from '../pages/auth/ResetPasswordPage.jsx';
import SignUpPage          from '../pages/auth/SignUpPage.jsx';
import HomePage            from '../pages/student/HomePage.jsx';
import Outlets             from '../pages/outlets/Outlets.jsx';
import OutletDetails       from '../pages/outlets/OutletDetails.jsx';
import FoodDetails         from '../pages/food/FoodDetails.jsx';
import CartPage            from '../pages/student/CartPage.jsx';
import CheckoutPage        from '../pages/student/CheckoutPage.jsx';
import OrdersPage          from '../pages/student/OrdersPage.jsx';
import OrderDetailPage     from '../pages/student/OrderDetailPage.jsx';
import ProfilePage         from '../pages/student/ProfilePage.jsx';
import StudentLayout       from '../layouts/StudentLayout.jsx';

const router = createBrowserRouter([
  { path: '/',                element: <Navigate to="/student/home" replace /> },
  { path: '/login',           element: <LoginPage /> },
  { path: '/signup',          element: <SignUpPage /> },
  { path: '/register',        element: <Navigate to="/signup" replace /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password',  element: <ResetPasswordPage /> },

  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { index: true,              element: <Navigate to="/student/home" replace /> },
      { path: 'home',             element: <HomePage /> },
      { path: 'outlets',          element: <Outlets /> },
      { path: 'outlets/:id',      element: <OutletDetails /> },
      { path: 'food/:id',         element: <FoodDetails /> },
      { path: 'cart',             element: <CartPage /> },
      { path: 'checkout',         element: <CheckoutPage /> },
      { path: 'orders',           element: <OrdersPage /> },
      { path: 'orders/:orderId',  element: <OrderDetailPage /> },
      { path: 'profile',          element: <ProfilePage /> },
    ],
  },

  { path: '*', element: <Navigate to="/student/home" replace /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
