import {
  addShippingDetails,
  fetchOrderDetails,
} from '@/app/stores/order/async';
import { addpayment } from '@/app/stores/payment/async';
import { useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatToIDR } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TransactionCard } from '../profile/component/transaction-card';

export default function OrderPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();
  const orders = useAppSelector((state) =>
    state.orders.orders.find((c) => c.id === Number(orderId))
  );
  // const shipping = Number(100);
  const total = orders?.totalAmount;

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: orders?.shippingDetails || {
      address: '',
      city: '',
      country: '',
      postalCode: '',
      phone: '',
    },
  });

  const handleToPayment = async () => {
    try {
      if (orders) {
        const paymentData = {
          order_id: orders?.id,
          gross_amount: +total!,
        };
        // Dispatch payment action to initiate payment and get redirect URL
        const resultAction = await dispatch(addpayment(paymentData)); // Use .unwrap() to get the action payload directly if using Redux Toolkit

        // If the payment creation was successful
        if (addpayment.fulfilled.match(resultAction)) {
          const { redirectUrl } = resultAction.payload;

          // Redirect user to the Midtrans payment page
          window.location.href = redirectUrl;
        } else {
          console.error('Failed to create payment:', resultAction.payload);
        }
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(Number(orderId)));
    }
  }, [dispatch, orderId]);

  const openShippingModal = () => {
    setIsShippingModalOpen(true);
  };

  const closeShippingModal = () => {
    setIsShippingModalOpen(false);
  };
  const onSubmit = async (data) => {
    if (orders) {
      await dispatch(
        addShippingDetails({ orderId: Number(orderId), shippingDetails: data })
      );
      reset();
      closeShippingModal();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Header />
      <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Order Summary */}
        <Card className="lg:col-span-4 bg-gray-800/50 border-none text-white p-2 rounded-lg lg:w-[500px] justify-self-center">
          <CardHeader className="text-xl font-semibold flex items-center">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Separator className="border-b" />
            <div className="space-y-4">
              <Card className="bg-[#303030] border-none p-2 text-white flex justify-between items-center">
                <CardHeader>
                  <CardTitle>Order ID: {orders?.id}</CardTitle>
                  <CardDescription className="text-red-500">
                    Status: {orders?.orderStatus}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Separator className="border-b" />

              {/* Shipping Information Button */}
              <Card className="bg-[#303030] border-none p-2">
                <CardTitle className="m-2 text-red-500">
                  <Badge className="text-md">
                    <Button
                      className="bg-red-500 text-white"
                      variant="link"
                      onClick={openShippingModal}
                    >
                      Shipping Information <RiEdit2Fill />
                    </Button>
                  </Badge>
                </CardTitle>
              </Card>

              {/* Order Items */}
              {orders?.orderItems.map((item, index) => (
                <TransactionCard
                  key={index}
                  transaction={{
                    id: item.product.id,
                    image: item.product.images[0].imageUrl,
                    item: item.product.product_name,
                    qty: item.quantity,
                    price: Number(item.price),
                    subTotal: item.quantity * Number(item.price),
                  }}
                />
              ))}

              {/* Totals */}
              <Separator className="border-t" />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatToIDR(orders?.totalAmount!)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2">
                <span>Total</span>
                <span>{formatToIDR(total!)}</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleToPayment}
                  className="w-full py-3 text-white bg-red-500 rounded-md font-semibold flex items-center justify-center"
                >
                  Payment <FaChevronRight className="ml-2" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Modal for Shipping Information */}
        <Dialog
          open={isShippingModalOpen}
          onOpenChange={setIsShippingModalOpen}
        >
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Shipping Information</DialogTitle>
            </DialogHeader>
            {orders?.shippingDetails ? (
              <div className="p-4 space-y-2">
                <p>
                  <strong>Address:</strong> {orders.shippingDetails.address}
                </p>
                <p>
                  <strong>City:</strong> {orders.shippingDetails.city}
                </p>
                <p>
                  <strong>State/Province:</strong>{' '}
                  {orders.shippingDetails.country}
                </p>
                <p>
                  <strong>Zip/Postal Code:</strong>{' '}
                  {orders.shippingDetails.postalCode}
                </p>
                <p>
                  <strong>Phone:</strong> {orders.shippingDetails.phone}
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-red-500">
                  No shipping information available.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-4 space-y-2">
                    <label>
                      Address
                      <input
                        type="text"
                        {...register('address')}
                        placeholder="Enter address"
                        className="w-full p-2 border"
                      />
                    </label>
                    <label>
                      City
                      <input
                        type="text"
                        {...register('city')}
                        placeholder="Enter city"
                        className="w-full p-2 border"
                      />
                    </label>
                    <label>
                      State/Province
                      <input
                        type="text"
                        {...register('country')}
                        placeholder="Enter state/province"
                        className="w-full p-2 border"
                      />
                    </label>
                    <label>
                      Zip/Postal Code
                      <input
                        type="text"
                        {...register('postalCode')}
                        placeholder="Enter zip/postal code"
                        className="w-full p-2 border"
                      />
                    </label>
                    <label>
                      Phone
                      <input
                        type="text"
                        {...register('phone')}
                        placeholder="Enter phone number"
                        className="w-full p-2 border"
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-red-500 text-white"
                  >
                    Save Shipping Information
                  </Button>
                  <Button
                    onClick={closeShippingModal}
                    className="w-full mt-4"
                  >
                    Close
                  </Button>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
