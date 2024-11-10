// export interface Payment {
//   id: number;
//   order_id: number;
//   paymentType?: string;
//   transactionId?: string;
//   gross_amount: number;
//   transactionStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
//   paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
//   createdAt: string;
//   updatedAt: string;
// }

// src/types/payment.ts
export interface CreatePaymentDTO {
  order_id: number;
  gross_amount: number;
}
