import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { NavIcons } from '../dashboard/page';
import ProductTable from './component/productTable';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { useEffect } from 'react';
import { getProduct } from '@/app/stores/product/async';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { Products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* sidebar */}
      <Sidebar
        icons={NavIcons}
        avatarSrc={'@user'}
      />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        {/* Navbar */}
        <div className="bg-black text-white rounded-md p-8">
          {/* ProductList Section */}
          <div className="flex flex-col w-full space-y-4">
            <h2 className="text-2xl text-red-500 font-black">List Product</h2>
            {loading && (
              <div className="">
                <h1>Loading...</h1>
              </div>
            )}
            {error && (
              <div className="">
                <h1>Error: {error}</h1>
              </div>
            )}
            <ProductTable products={Products} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
