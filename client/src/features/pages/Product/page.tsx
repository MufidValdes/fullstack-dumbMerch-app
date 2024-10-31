import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { NavIcons } from '../dashboard/page';
import ProductTable from './component/productTable';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { useEffect, useState } from 'react';
import { createProduct, getProduct } from '@/app/stores/product/async';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RiEdit2Fill } from 'react-icons/ri';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/types/product';

export type ProductFormInputs = {
  product_name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  images: FileList;
};
type ProductInputsDTO = Omit<IProduct, 'id' | 'orderItems'>;

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { Products, loading, error } = useAppSelector((state) => state.product);
  const avatar = useAppSelector((state) => state.profile.profile.avatar);

  const { register, handleSubmit, reset, watch } = useForm<ProductFormInputs>();
  console.log(watch('images'));
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const selectedImages = watch('images');

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // Preview image when file is selected
  useEffect(() => {
    if (selectedImages && selectedImages.length > 0) {
      const imageUrls = Array.from(selectedImages).map((file) =>
        URL.createObjectURL(file as unknown as Blob)
      );
      setPreviewImages(imageUrls);

      return () => imageUrls.forEach((url) => URL.revokeObjectURL(url)); // Clean up preview URLs
    }
  }, [selectedImages]);

  const onSubmit = async (data: ProductFormInputs) => {
    const formData = new FormData();
    formData.append('product_name', data.product_name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('categoryId', data.categoryId.toString());

    // Append each image file to FormData
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image) => {
        formData.append('images', image);
      });
    }
    console.log('text', formData);

    await dispatch(createProduct(formData));
    dispatch(getProduct()); // Refresh product list after creation
    reset(); // Reset form fields after submission
    setPreviewImages([]); // Reset the preview image
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* sidebar */}
      <Sidebar
        icons={NavIcons}
        avatarSrc={avatar!}
      />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        {/* Navbar */}
        <div className="bg-black text-white rounded-md p-8">
          {/* ProductList Section */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl text-red-500 font-black">List Product</h2>
              <Dialog>
                <DialogTrigger className="flex items-center">
                  <RiEdit2Fill className="text-red-500" />
                  <Button
                    variant="ghost"
                    className="text-red-500"
                  >
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[600px] lg:max-w-[655px] bg-black text-white">
                  <DialogHeader>
                    <DialogTitle className="p-4 rounded-lg">
                      Add Product
                    </DialogTitle>
                  </DialogHeader>
                  <div className=" md:flex ">
                    <div className="lg:w-[200px] m-auto w-[300px]">
                      <Card className="min-w-[100%] md:min-h-[400px] flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-2">
                          {previewImages.length > 0 ? (
                            previewImages.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                                className="rounded-lg w-32 h-32 object-cover"
                              />
                            ))
                          ) : (
                            <div className="w-[179px] h-[400px] rounded-lg flex justify-center">
                              <h2 className="m-auto">NO IMAGE</h2>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full"
                        >
                          Review Image
                        </Button>
                      </Card>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-4 py-4 ml-4 p-4 rounded-lg">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="product_name">Product Name</Label>
                          <Input
                            id="product_name"
                            placeholder="Product Name"
                            {...register('product_name')}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Description"
                            {...register('description')}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="Price"
                            {...register('price')}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="stock">Stock</Label>
                          <Input
                            id="stock"
                            type="number"
                            placeholder="Stock"
                            {...register('stock')}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="categoryId">Category ID</Label>
                          <Input
                            id="categoryId"
                            type="number"
                            placeholder="Category ID"
                            {...register('categoryId')}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="images">Images</Label>
                          <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            {...register('images')}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-red-500 mt-2"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {loading && (
              <div className="">
                <h1>Loading...</h1>
              </div>
            )}
            {error && (
              <div className="">
                <h1>Error: {error}</h1>
              </div>
            )}
            <ProductTable products={Products} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
