import LoginPage from '@/features/auth/login/page';
import RegisterPage from '@/features/auth/register/page';
import ProductPage from '@/features/pages/Product/page';
import CategoryPage from '@/features/pages/category/page';
import CustomerServicePage from '@/features/pages/customerService/page';
import Dashboard from '@/features/pages/dashboard/page';
import DetailPage from '@/features/pages/detail/page';
import MarketPage from '@/features/pages/market/page';
import ProfilePage from '@/features/pages/profile/page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './_protected-routes';
import CategoryEditPage from '@/features/pages/category/EditPage';
import ProductEditPage from '@/features/pages/Product/EditPage';
import CartPage from '@/features/pages/cart/page';
import ProfileAdminPage from '@/features/pages/profile/pageAdmin';
import ComplainPage from '@/features/pages/customerService/adminPage';
export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      element: <ProtectedRoute role={'USER'} />,
      children: [
        {
          path: '/',
          element: <MarketPage />,
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
          path: '/detail/:id',
          element: <DetailPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },
    {
      element: <ProtectedRoute role={'ADMIN'} />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/category/',
          element: <CategoryPage />,
        },
        {
          path: '/category/:id',
          element: <CategoryEditPage />,
        },
        {
          path: '/product',
          element: <ProductPage />,
        },
        {
          path: '/product/:id',
          element: <ProductEditPage />,
        },
        {
          path: '/admin-profile',
          element: <ProfileAdminPage />,
        },
        {
          path: '/admin-complain',
          element: <ComplainPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
