import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductDTO } from '@/types/product';
import { useParams } from 'react-router-dom';
import { NavIcons } from '../dashboard/page';
import { products } from './page';

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const product: ProductDTO | undefined = products.find(
    (item) => item.id === Number(id)
  );
  if (!product) return <div>Product not found</div>;

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

          {/* ProductEdit Information */}
          <div className="m-2">
            <h2 className="text-2xl mb-4 text-red-500 font-black">
              Edit Product{' '}
            </h2>
            <div className="flex flex-col w-full max-w-[100%] gap-8">
              <div className="flex items-center gap-1.5">
                <Input
                  type="file"
                  id="custom-input"
                  placeholder={product.photo}
                  className="hidden"
                />
                <Label
                  htmlFor="custom-input"
                  className=" bg-red-500 p-3 rounded-md max-w-[200px] border-none"
                >
                  upload image
                </Label>
                <Label className="">{product.photo}</Label>
              </div>
              <Input
                type="text"
                placeholder={product.product_name}
              />
              <Input
                type="text"
                placeholder={product.product_desc}
              />
              <Input
                type="number"
                placeholder={product.price}
              />
              <Input
                type="number"
                placeholder={'qty'}
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
      </main>
    </div>
  );
};

export default ProductEditPage;
