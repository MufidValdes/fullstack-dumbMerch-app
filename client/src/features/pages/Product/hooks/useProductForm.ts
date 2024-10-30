import { ProductImages } from '@/types/product';
import { useState } from 'react';

export const useProductForm = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState<ProductImages[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = {
        id: 0,
        productId: formData.id, // atau gunakan ID lain yang relevan
        imageUrl: URL.createObjectURL(e.target.files[0]),
      };
      setImages((prevImages) => [...prevImages, uploadedImage]);
    }
  };

  return {
    formData,
    images,
    handleChange,
    handleImageChange,
    setFormData,
  };
};
