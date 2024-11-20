import { deleteImageProduct } from '@/app/stores/product/async';
import { useAppDispatch } from '@/app/stores/stores';
import { ProductImages } from '@/types/product';
import { useState } from 'react';

export const useProductForm = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState<ProductImages[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const uploadedImage = {
        id: 0,
        productId: formData.id,
        imageUrl: URL.createObjectURL(file),
        file, // Simpan file untuk dikirim ke server
      };
      setImages((prevImages) => [...prevImages, uploadedImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = (imageId: number) => {
    setDeletedImageIds((prevIds) => [...prevIds, imageId]);
    dispatch(deleteImageProduct(imageId));
  };

  return {
    formData,
    images,
    handleChange,
    handleImageChange,
    setFormData,
    removeImage,
    deletedImageIds,
    handleDeleteExistingImage,
  };
};
