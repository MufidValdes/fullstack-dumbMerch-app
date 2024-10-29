import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { IProduct } from '@/types/product';
import { NavIcons } from '../dashboard/page';
import ProductTable from './component/productTable';

export const products: IProduct[] = [
  {
    id: 1,
    photo: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
    product_name: 'Mouse',
    product_desc: 'Lorem ipsum mouse ...',
    price: '500.000',
    qty: 600,
  },
  {
    id: 2,
    photo: 'https://wallpapercave.com/wp/wp13355714.jpg',
    product_name: 'Keyboard',
    product_desc: 'Lorem ipsum keyboard ...',
    price: '700.000',
    qty: 600,
  },
  {
    id: 3,
    photo: 'https://wallpapercave.com/wp/wp12546032.jpg',
    product_name: 'Bag',
    product_desc: 'Lorem ipsum bag ...',
    price: '300.000',
    qty: 600,
  },
  {
    id: 4,
    photo: 'https://wallpapercave.com/wp/wp13357464.jpg',
    product_name: 'Stationary',
    product_desc: 'Lorem ipsum stationary ...',
    price: '25.000',
    qty: 600,
  },
  {
    id: 5,
    photo: 'https://wallpapercave.com/wp/wp13357665.jpg',
    product_name: 'Doll',
    product_desc: 'Lorem ipsum doll ...',
    price: '125.000',
    qty: 600,
  },
  {
    id: 6,
    photo: 'https://wallpapercave.com/wp/wp13357665.jpg',
    product_name: 'Pillow',
    product_desc: 'Lorem ipsum pillow ...',
    price: '300.000',
    qty: 600,
  },
];
const ProductPage = () => {
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
          {/* ProductList Section */}
          <div className="flex flex-col w-full space-y-4">
            <h2 className="text-2xl text-red-500 font-black">List Product</h2>
            <ProductTable products={products} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
