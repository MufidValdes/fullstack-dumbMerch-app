// src/components/ProtectedRoute.tsx
import { useAppSelector } from '@/app/stores/auth/authStore';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  console.log('user', user);
  console.log('token', token);
  // Redirect ke login jika pengguna tidak terautentikasi
  if (!user || !token) {
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
