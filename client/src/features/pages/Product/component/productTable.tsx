import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProductRow from './productRow';
import { IProduct } from '@/types/product';

interface ProductTableProps {
  products: IProduct[];
}
const ProductTable = ({ products }: ProductTableProps) => (
  <Table>
    <TableCaption>A list of your recent products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>No</TableHead>
        <TableHead>Photo</TableHead>
        <TableHead>Product Name</TableHead>
        <TableHead>Product Desc</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="overflow-x-auto">
      {products.map((product, index) => (
        <ProductRow
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </TableBody>
  </Table>
);

export default ProductTable;
