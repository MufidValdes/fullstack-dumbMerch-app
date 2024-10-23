// src/components/ui/ProductCard.tsx
import { Card, CardFooter } from '@/components/ui/card';
import { IProduct } from '@/types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/detail/${product.id}`}>
      <Card className="w-[241px] h-[410px] bg-[#212121] border-none">
        <img
          src={product.photo}
          alt={product.product_name}
          className="rounded-lg w-[241px] h-[320px] object-cover"
        />
        <CardFooter>
          <div className="flex-col gap-2">
            <h3 className="text-red-500 text-lg font-black">
              {product.product_name}
            </h3>
            <p className="text-white text-[14px]">{product.price}</p>
            <p className="text-red-500 text-[14px]">{product.qty}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
