import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Transaction } from '@/types/product';
import { transactions } from '@/features/pages/market/page';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const product: Transaction | undefined = transactions.find(
    (item) => item.id === Number(id)
  );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <Header />

      <div className="flex justify-end">
        {/* Product Information */}
        <div className="w-full max-w-[1035px] space-y-4">
          <div className="flex flex-wrap gap-10">
            {/* Product Image */}
            <Card className="w-full max-w-[300px] max-h-[450px] bg-[#212121] border-none">
              <img
                src={product.photo}
                alt={product.product_name}
                className="rounded-lg w-full h-[450px] object-cover"
              />
            </Card>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full max-w-[500px] space-y-2">
              <h2 className="text-2xl text-red-500 font-black">
                {product.product_name}
              </h2>
              <p>Stock: {product.qty}</p>

              {/* Product Specifications */}
              <ul className="list-disc pl-5 space-y-1">
                <li>{product.product_desc} specification 1</li>
                <li>{product.product_desc} specification 2</li>
              </ul>

              {/* Product Description */}
              <p className="text-gray-400">
                This is a description of {product.product_desc}.
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-red-500 flex justify-end">
                {product.price}
              </div>

              {/* Buy Button */}
              <Button className="bg-red-500 w-full">Buy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
