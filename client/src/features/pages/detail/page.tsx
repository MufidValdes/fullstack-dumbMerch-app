import { getProduct } from '@/app/stores/product/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  // const product: Transaction | undefined = transactions.find(
  //   (item) => item.id === Number(id)
  // );
  // if (!product) return <div>Product not found</div>;
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) =>
    state.product.Products.find((c) => c.id === Number(id))
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <Header />

        <div className="flex-auto justify-center max-w-[900px] min-h-[500px] m-auto">
          {/* Product Information */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 ">
            {/* Product Image */}
            <div className="flex gap-2">
              {/* Thumbnail Grid (Sebelah Kiri) */}
              <div className="grid grid-cols-1 gap-4">
                {products?.images.slice(1, 6).map((product, index) => (
                  <div key={index}>
                    <img
                      src={product.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover object-center w-20 h-20 rounded-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Gambar Utama (Sebelah Kanan) */}
              <div className="w-full max-w-[400px]">
                <img
                  src={products?.images[0]?.imageUrl}
                  alt="Main Product"
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[420px] transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-[320px] space-y-2 mr-4">
              <h2 className="text-2xl text-red-500 font-black">
                {products?.product_name}
              </h2>
              <p>Stock: {products?.stock}</p>

              {/* Product Specifications */}
              <ul className="list-disc pl-5 space-y-1">
                <li>{products?.description} specification 1</li>
                <li>{products?.description} specification 2</li>
              </ul>

              {/* Product Description */}
              <p className="text-gray-400">
                This is a description of {products?.product_name}.
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-red-500 flex justify-end">
                {products?.price}
              </div>

              {/* Buy Button */}
              <Button className="bg-red-500 w-full">Buy</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
