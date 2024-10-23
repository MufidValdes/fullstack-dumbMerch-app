export interface IProduct {
  id: number;
  photo: string;
  product_name: string;
  product_desc?: string;
  price: string;
  qty: number;
  date?: string;
  subTotal?: string;
}

export interface Transaction extends IProduct {}
export interface ProductDTO extends IProduct {}
