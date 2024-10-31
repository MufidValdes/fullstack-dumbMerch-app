import { deleteCategories, getCategories } from '@/app/stores/category/async';
import { useAppDispatch } from '@/app/stores/stores';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { ICategories } from '@/types/categories';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  category: ICategories;
  index: number;
}
// Reusable Product Row
const ProductRow: React.FC<ProductProps> = ({ category, index }) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteCategories(category.id));
    dispatch(getCategories());
    setShowConfirm(false);
  };
  return (
    <>
      <TableRow className={index % 2 === 0 ? 'bg-[#303030]' : 'bg-[#232323]'}>
        <TableCell className="font-medium">{category.id}</TableCell>
        <TableCell className="font-medium">{category.category_name}</TableCell>
        <TableCell className="text-right space-x-2">
          <Link to={`/category/${category.id}`}>
            <Button className="bg-green-500 text-white">Edit</Button>
          </Link>
          <Button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center text-black">
            <h2 className="mb-4 text-lg font-bold">Are you sure?</h2>
            <p className="mb-6">Do you really want to delete this product?</p>
            <div className="flex justify-center space-x-4">
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductRow;
