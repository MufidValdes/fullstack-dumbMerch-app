import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useParams } from 'react-router-dom';
import { NavIcons } from '../dashboard/page';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { useEffect } from 'react';
import { getProduct, updateProduct } from '@/app/stores/product/async';
import { useProductForm } from './hooks/useProductForm';
import { FaTrash } from 'react-icons/fa';

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const avatar = useAppSelector((state) => state.profile.profile.avatar);
  const product = useAppSelector((state) =>
    state.product.Products.find((c) => c.id === Number(id))
  );

  const {
    formData,
    images: uploadedImages,
    handleChange,
    handleImageChange,
    setFormData,
    removeImage,
    deletedImageIds,
    handleDeleteExistingImage,
  } = useProductForm({
    id: product?.id || 0,
    product_name: product?.product_name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    initialImages: product?.images || [],
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
      // Filter out deleted images and add new images
      const finalImages = [
        ...product.images.filter((img) => !deletedImageIds.includes(img.id)),
        ...uploadedImages,
      ];

      dispatch(
        updateProduct({
          ...formData,
          images: finalImages,
        })
      );
      dispatch(getProduct());
    }
    navigate('/product');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        icons={NavIcons}
        avatarSrc={avatar!}
      />
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        <div className="bg-black text-white rounded-md p-8">
          <div className="m-2">
            <h2 className="text-2xl mb-4 text-red-500 font-black">
              Edit Product
            </h2>

            {/* Display Existing Images */}
            <div className="flex gap-4 mb-4 flex-wrap">
              {product?.images
                .filter((img) => !deletedImageIds.includes(img.id))
                .map((img) => (
                  <div
                    key={img.id}
                    className="relative"
                  >
                    <img
                      src={img.imageUrl}
                      alt="Existing Product"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleDeleteExistingImage(img.id)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      aria-label="Remove Image"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>

            {/* Display Uploaded Images */}
            <div className="flex gap-4 mb-4 flex-wrap">
              {uploadedImages.length > 0 &&
                uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={img.imageUrl}
                      alt="Product"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      aria-label="Remove Image"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>

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
