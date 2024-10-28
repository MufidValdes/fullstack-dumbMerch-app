// get
// create
import { Request, Response } from 'express';
import * as productService from '@services/product.service';
import {
  CreateReviewDTO,
  ProductDTO,
  UpdateProductDTO,
} from '@src/dto/product.dto';

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
    const product = await productService.createProduct(bodyproduct);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = +req.params.id;
    const data: UpdateProductDTO = req.body;
    const updatedProduct = await productService.updateProduct(productId, data);
    res.status(200).json(updatedProduct);
  } catch (error) {
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
