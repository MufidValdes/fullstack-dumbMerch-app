// get
// create
import { Request, Response } from 'express';
import * as productService from '@services/product.service';
import {
  CreateReviewDTO,
  ProductDTO,
  UpdateProductDTO,
} from '@src/dto/product.dto';
import { uploadImage } from '@src/utils/cloudinary';

export const getProductById = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const product = await productService.getProductById(userId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error getting product', error });
  }
};

export const getAllproducts = async (req: Request, res: Response) => {
  // #swagger.tags = ['Product']
  // #swagger.description = 'Retrieve all products'
  try {
    const product = await productService.getAllproducts();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // #swagger.tags = ['Product']
  // #swagger.description = 'Create a new product'
  /**
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Product details',
     schema: {
       $ref: '#/definitions/Product'
     }
   }
  */
  try {
    const bodyproduct: ProductDTO = req.body;
    console.log(bodyproduct);

    const imageFiles = req.files as Express.Multer.File[];
    console.log('img', imageFiles);
    if (req.files) {
      bodyproduct.images = await uploadImage(imageFiles);
    }
    const product = await productService.createProduct(bodyproduct);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Error creating product', error });
  }
};

export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = +req.params.id;
    const data: UpdateProductDTO = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    // Jika ada file gambar baru yang diunggah, upload ke Cloudinary
    if (imageFiles) {
      const uploadedImages = await uploadImage(imageFiles);
      data.images = [...(data.images || []), ...uploadedImages];
    }
    const updatedProduct = await productService.updateProduct(productId, data);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error updated Product' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = +req.params.id;
    await productService.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'error deleted product' });
  }
}

export async function addReview(req: Request, res: Response) {
  try {
    const data: CreateReviewDTO = req.body;
    const review = await productService.addReview(data);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'error add new review' });
  }
}

export async function getProductReviews(req: Request, res: Response) {
  try {
    const productId = +req.params.productId;
    const reviews = await productService.getProductReviews(productId);
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'error getting product review', error: error });
  }
}

export async function searchProduct(req: Request, res: Response) {
  try {
    const querry = req.query.querry as string;
    const sortby = req.query.sortby as string;
    const order = req.query.order as 'asc' | 'desc';
    const product = await productService.search(querry, sortby, order);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error Search Product', error });
  }
}
