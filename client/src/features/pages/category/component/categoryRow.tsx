import { deleteCategories } from '@/app/stores/category/async';
import { useAppDispatch } from '@/app/stores/stores';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { ICategories } from '@/types/categories';
import { Link } from 'react-router-dom';

interface ProductProps {
  category: ICategories;
  index: number;
}
// Reusable Product Row
const ProductRow: React.FC<ProductProps> = ({ category, index }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCategories(category.id));
  };
  return (
    <TableRow className={index % 2 === 0 ? 'bg-[#303030]' : 'bg-[#232323]'}>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell className="font-medium">{category.category_name}</TableCell>
      <TableCell className="text-right space-x-2">
        <Link to={`/category/${category.id}`}>
          <Button className="bg-green-500 text-white">Edit</Button>
        </Link>
        <Button
          onClick={handleDelete}
          className="bg-red-500 text-white"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
