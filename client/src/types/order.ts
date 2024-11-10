import { IProduct } from './product';

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: IProduct;
}

export interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: number;
  user?: {
    email: string;
  };
  userId: number;
  orderItems: OrderItem[];
  totalAmount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  shippingDetails: ShippingDetails;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}
