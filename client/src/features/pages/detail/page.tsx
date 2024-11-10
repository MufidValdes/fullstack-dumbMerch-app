import { addToCart, getCart } from '@/app/stores/cart/async';
import { getProduct } from '@/app/stores/product/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { formatToIDR } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) =>
    state.product.Products.find((c) => c.id === Number(id))
  );

  // State untuk gambar utama
  const [mainImage, setMainImage] = useState<string | undefined>(
    products?.images[0]?.imageUrl
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  const navigate = useNavigate();
  // Update main image setiap kali produk berubah
  useEffect(() => {
    if (products?.images?.[0]?.imageUrl) {
      setMainImage(products.images[0].imageUrl);
    }
  }, [products]);
  const handleAddToCart = () => {
    const addToCartData = {
      productId: Number(id),
      quantity: 1,
    };
    dispatch(addToCart(addToCartData))
      .then(() => {
        Swal.fire({
          title: `${products?.product_name} berhasil ditambahkan kedalam keranjang`,
          icon: 'success',
        });
        dispatch(getCart());
        navigate(`/cart`);
      })
      .catch(() => {
        Swal.fire({
          title: 'Gagal ditambahkan kedalam keranjang',
          icon: 'error',
        });
      });
  };

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
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {/* Gambar dan Thumbnail */}
            <div className="flex gap-2">
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-1 gap-4">
                {products?.images.slice(1, 6).map((product, index) => (
                  <div key={index}>
                    <img
                      src={product.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover object-center w-20 h-20 rounded-lg cursor-pointer"
                      onClick={() => setMainImage(product.imageUrl)}
                    />
                  </div>
                ))}
              </div>

              {/* Gambar Utama */}
              <div className="w-full max-w-[400px]">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[420px] transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>

            {/* Detail Produk */}
            <div className="flex flex-col justify-between w-[320px] space-y-2 mr-4">
              <h2 className="text-2xl text-red-500 font-black">
                {products?.product_name}
              </h2>
              <p>Stock: {products?.stock}</p>

              <ul className="list-disc pl-5 space-y-1">
                <li>{products?.description} specification 1</li>
                <li>{products?.description} specification 2</li>
              </ul>

              <p className="text-gray-400">
                This is a description of {products?.product_name}.
              </p>

              <div className="text-2xl font-bold text-red-500 flex justify-end">
                {formatToIDR(products?.price!)}
              </div>
              <Button
                onClick={handleAddToCart}
                className="bg-red-500 w-full"
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
