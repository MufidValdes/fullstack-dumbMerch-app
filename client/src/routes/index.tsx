import LoginPage from '@/features/auth/login/page';
import RegisterPage from '@/features/auth/register/page';
import MarketPage from '@/features/dashboard/market/page';
import ProfilePage from '@/features/dashboard/profile/page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MarketPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
