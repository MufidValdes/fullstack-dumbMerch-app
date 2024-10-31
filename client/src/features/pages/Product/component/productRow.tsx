import { deleteProduct, getProduct } from '@/app/stores/product/async';
import { useAppDispatch } from '@/app/stores/stores';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { IProduct } from '@/types/product';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: IProduct;
  index: number;
}
// Reusable Product Row
const ProductRow: React.FC<ProductProps> = ({ product, index }) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    await dispatch(deleteProduct(product.id));
    dispatch(getProduct());
    setShowConfirm(false);
  };
  return (
    <>
      <TableRow className={index % 2 === 0 ? 'bg-[#303030]' : 'bg-[#232323]'}>
        <TableCell className="font-medium">{product.id}</TableCell>
        <TableCell>
          <div className="lg:flex space-y-1 gap-1">
            {product.images.map((image) => (
              <img
                src={image.imageUrl}
                alt="product"
                className="rounded-md object-cover w-[40px] h-[40px]"
              />
            ))}
          </div>
        </TableCell>
        <TableCell>{product.product_name}</TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell>{product.stock}</TableCell>
        <TableCell className="text-right space-x-2 flex justify-end">
          <Link to={`/product/${product.id}`}>
            <Button className="bg-green-500 text-white">Edit</Button>
          </Link>
          <Button
            className="bg-red-500 text-white"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {/* Confirmation Dialog */}
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
