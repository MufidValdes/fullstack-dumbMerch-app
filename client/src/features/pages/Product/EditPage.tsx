import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import { NavIcons } from '../dashboard/page';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { useEffect } from 'react';
import { getProduct, updateProduct } from '@/app/stores/product/async';
import { useProductForm } from './hooks/useProductForm';

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.product.Products.find((c) => c.id === Number(id))
  );

  const { formData, images, handleChange, handleImageChange, setFormData } =
    useProductForm({
      id: product?.id || 0,
      product_name: product?.product_name || '',
      description: product?.description || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
    });

  useEffect(() => {
    if (!product) {
      dispatch(getProduct());
    } else {
      setFormData(product);
    }
  }, [dispatch, product, setFormData]);

  const handleSave = () => {
    if (product) {
      dispatch(
        updateProduct({
          ...formData,
          images,
          // images: images.length > 0 ? images : product.images, // Menggunakan gambar yang ada jika tidak ada yang diunggah
        })
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        icons={NavIcons}
        avatarSrc={'@user'}
      />
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        <div className="bg-black text-white rounded-md p-8">
          <div className="m-2">
            <h2 className="text-2xl mb-4 text-red-500 font-black">
              Edit Product
            </h2>
            <div className="flex flex-col w-full max-w-[100%] gap-8">
              <div className="flex items-center gap-1.5">
                <Input
                  type="file"
                  id="custom-input"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Label
                  htmlFor="custom-input"
                  className="bg-red-500 p-3 rounded-md max-w-[200px] border-none"
                >
                  Upload Image
                </Label>
              </div>
              <Input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Quantity"
              />
              <Button
                className="bg-red-500 w-full"
                onClick={handleSave}
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
