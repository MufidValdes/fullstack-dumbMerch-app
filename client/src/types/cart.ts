import { IProduct } from './product';

export interface ICartItemDTO {
  id: number;
  quantity: number;
}
export interface IAddToCartDTO {
  productId: number;
  quantity: number;
}

export interface ICartItemEntities {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  product: IProduct;
}

export interface CartDTO {
  id: number;
  userId: number;
  cartItems: ICartItemEntities[];
}

// data yang terdapat pada response backend
// export const cart: CartDTO = {
//   id: 1,
//   userId: 1,
//   cartItems: [
//     {
//       cartId: 1,
//       productId: 11,
//       quantity: 2,
//       price: '3668000',
//       createdAt: '2024-11-02T07:39:32.116Z',
//       updatedAt: '2024-11-02T07:39:32.116Z',
//       product: {
//         id: 11,
//         product_name: 'wedus ',
//         description: 'cempe jowo',
//         price: '3668000',
//         stock: 22,
//         categoryId: 5,
//         createdAt: '2024-10-30T03:05:14.587Z',
//         updatedAt: '2024-10-30T03:15:10.008Z',
//       },
//     },
//   ],
// };
