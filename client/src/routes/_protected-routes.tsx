// src/components/ProtectedRoute.tsx
// import { useAppSelector } from '@/app/stores/stores';
import { useAppSelector } from '@/app/stores/stores';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ role: any }> = ({ role }) => {
  const authToken = localStorage.getItem('token');
  const user = useAppSelector((state) => state.auth.user);
  // console.log('token', authToken);
  // Redirect ke login jika pengguna tidak terautentikasi
  if (!authToken) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  if (role && user?.role !== role) {
    // Redirect if the user's role doesn't match the required role
    return <Navigate to={user?.role === 'ADMIN' ? '/dashboard' : '/'} />;
  }

  // Render komponen anak melalui Outlet jika terautentikasi
  return <Outlet />;
};
