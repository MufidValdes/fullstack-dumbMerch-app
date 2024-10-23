import { HeaderAdmin } from '@/components/layout/headerAdmin';
import { CategoryDTO } from '@/types/categories';
import { useParams } from 'react-router-dom';
import { categories } from './page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CategoryEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const category: CategoryDTO | undefined = categories.find(
    (item) => item.id === Number(id)
  );
  if (!category) return <div>Product not found</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <HeaderAdmin />
      <div className="space-y-14 m-12">
        <h2 className="text-2xl text-red-500 font-black">Edit Category</h2>
        <div className="flex flex-col w-full max-w-[100%] gap-8">
          <Input
            type="text"
            placeholder={category.category_name}
          />
          {/* Buy Button */}
          <Button
            className="bg-red-500 w-full"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditPage;
