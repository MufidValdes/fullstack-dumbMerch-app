import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { IProduct } from '@/types/product';
import { Link } from 'react-router-dom';

interface ProductProps {
  product: IProduct;
  index: number;
}
// Reusable Product Row
const ProductRow: React.FC<ProductProps> = ({ product, index }) => {
  return (
    <TableRow className={index % 2 === 0 ? 'bg-[#303030]' : 'bg-[#232323]'}>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell>
        <div className="lg:flex ">
          {product.images.map((image) => (
            <img
              src={image.imageUrl}
              alt="product"
              width={50}
              height={50}
              className="rounded-md"
            />
          ))}
        </div>
      </TableCell>
      <TableCell>{product.product_name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell className="text-right space-x-2 flex">
        <Link to={`/product/${product.id}`}>
          <Button className="bg-green-500 text-white">Edit</Button>
        </Link>
        <Button className="bg-red-500 text-white">Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
