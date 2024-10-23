import { HeaderAdmin } from '@/components/layout/headerAdmin';
import CategoriesTable from './component/categoryTable';
import { ICategories } from '@/types/categories';

export const categories: ICategories[] = [
  {
    id: 1,
    category_name: 'Mouse',
  },
  {
    id: 2,
    category_name: 'Keyboard',
  },
  {
    id: 3,
    category_name: 'Bag',
  },
  {
    id: 4,
    category_name: 'Stationary',
  },
  {
    id: 5,
    category_name: 'Doll',
  },
  {
    id: 6,
    category_name: 'Pillow',
  },
];

const CategoryPage = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <HeaderAdmin />

      {/* CategoryList Section */}
      <div className="flex flex-col w-full space-y-4">
        <h2 className="text-2xl text-red-500 font-black">List Category</h2>
        <CategoriesTable Categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
