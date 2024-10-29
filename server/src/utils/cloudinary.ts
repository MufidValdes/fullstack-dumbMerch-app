// src/utils/cloudinary.ts
import { ProductImageDTO } from '@src/dto/product.dto';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (files: Express.Multer.File[]) => {
  console.log(files);
  const urls: ProductImageDTO[] = [];
  await Promise.all(
    files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
      const uploadedFile = await cloudinary.uploader.upload(dataURI, {
        folder: 'ecommerce_products',
        use_filename: true,
        unique_filename: true,
      });
      urls.push({
        imageUrl: uploadedFile.secure_url,
      });
    })
  );

  return urls;
};

export const deleteImage = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary');
  }
};
