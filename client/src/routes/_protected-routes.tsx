// src/components/ProtectedRoute.tsx
import { useAppSelector } from '@/app/stores/stores';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem('token');
  const user = useAppSelector((state) => state.auth.user);
  console.log('token', authToken);
  // Redirect ke login jika pengguna tidak terautentikasi
  if (!user?.id || !authToken) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Render komponen anak melalui Outlet jika terautentikasi
  return <Outlet />;
};
