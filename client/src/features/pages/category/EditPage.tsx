import { getCategories, updateCategories } from '@/app/stores/category/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavIcons } from '../dashboard/page';

const CategoryEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) =>
    state.categories.categories.find((c) => c.id === Number(id))
  );
  const [categoryName, setCategoryName] = useState(
    category?.category_name || ''
  );

  useEffect(() => {
    if (!category) {
      dispatch(getCategories());
    }
  }, [dispatch, category]);

  const handleSave = () => {
    if (category) {
      dispatch(
        updateCategories({ id: category.id, category_name: categoryName })
      );
    }
  };
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
          {/* Header */}
          <div className="space-y-10 m-12">
            <h2 className="text-2xl text-red-500 font-black">Edit Category</h2>
            <div className="flex flex-col w-full max-w-[100%] gap-8">
              <Input
                type="text"
                value={categoryName}
                onChange={(event: any) => setCategoryName(event.target.value)}
              />
              {/* Buy Button */}
              <Button
                onClick={handleSave}
                className="bg-red-500 w-full"
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryEditPage;
