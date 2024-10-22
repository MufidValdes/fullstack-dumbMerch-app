import LoginPage from '@/features/auth/login/page';
import RegisterPage from '@/features/auth/register/page';
import CustomerServicePage from '@/features/pages/customerService/page';
import DetailPage from '@/features/pages/detail/page';
import MarketPage from '@/features/pages/market/page';
import ProfilePage from '@/features/pages/profile/page';
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
    {
      path: '/complain',
      element: <CustomerServicePage />,
    },
    {
      path: '/detail',
      element: <DetailPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
