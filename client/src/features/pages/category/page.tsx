import { getCategories } from '@/app/stores/category/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { useEffect } from 'react';
import CategoriesTable from './component/categoryTable';
import { NavIcons } from '../dashboard/page';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
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
        <div className="bg-black text-white p-8 rounded-md">
          {/* CategoryList Section */}
          <div className="flex flex-col w-full space-y-4">
            <h2 className="text-2xl text-red-500 font-black">List Category</h2>
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
            <CategoriesTable Categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
