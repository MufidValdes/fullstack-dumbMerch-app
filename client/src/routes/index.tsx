import LoginPage from '@/features/auth/login/page';
import RegisterPage from '@/features/auth/register/page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div> home</div>,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
