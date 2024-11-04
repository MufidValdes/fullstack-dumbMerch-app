export interface AddToCartDTO {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDTO {
  quantity: number;
}
