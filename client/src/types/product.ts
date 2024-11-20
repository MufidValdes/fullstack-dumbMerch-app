export interface IProduct {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  orderItems?: OrderItems;
  images: ProductImages[] | any[];
}

export interface OrderItems {
  id: number;
  orderId: number;
  quantity: number;
  price: number;
}

export interface ProductImages {
  id: number;
  productId: number;
  imageUrl: string;
}
export interface Transaction extends IProduct {}
export interface ProductDTO extends IProduct {}
