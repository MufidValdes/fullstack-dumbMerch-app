import { deleteImageProduct } from '@/app/stores/product/async';
import { ProductImages } from '@/types/product';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useProductForm = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState<ProductImages[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = {
        id: 0,
        productId: formData.id,
        imageUrl: URL.createObjectURL(e.target.files[0]),
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
