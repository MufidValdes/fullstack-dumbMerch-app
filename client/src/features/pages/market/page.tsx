// src/pages/MarketPage.tsx
import { getProduct } from '@/app/stores/product/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { Header } from '@/components/layout/header';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ProductCard from './component/productCard';

// export const transactions: Transaction[] = [
//   {
//     id: 0,
//     product_name: 'wallpapers',
//     date: 'Saturday, 14 Juli 2021',
//     price: 'Rp.500.000',
//     qty: 10,
//     subTotal: '500.000',
//     photo: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
//   },
//   {
//     id: 1,
//     product_name: 'wallpapers',
//     date: 'Saturday, 14 Juli 2021',
//     price: 'Rp.500.000',
//     qty: 10,
//     subTotal: '500.000',
//     photo: 'https://wallpapercave.com/wp/wp13355714.jpg',
//   },
//   {
//     id: 2,
//     product_name: 'wallpapers',
//     date: 'Saturday, 14 Juli 2021',
//     price: 'Rp.500.000',
//     qty: 10,
//     subTotal: '500.000',
//     photo: 'https://wallpapercave.com/wp/wp12546032.jpg',
//   },
//   {
//     id: 3,
//     product_name: 'wallpapers',
//     date: 'Saturday, 14 Juli 2021',
//     price: 'Rp.500.000',
//     qty: 10,
//     subTotal: '500.000',
//     photo: 'https://wallpapercave.com/wp/wp13357464.jpg',
//   },
//   {
//     id: 4,
//     product_name: 'wallpapers',
//     date: 'Saturday, 14 Juli 2021',
//     price: 'Rp.500.000',
//     qty: 10,
//     subTotal: '500.000',
//     photo: 'https://wallpapercave.com/wp/wp13357665.jpg',
//   },

//   // ... other products
// ];

export default function MarketPage() {
  const dispatch = useAppDispatch();
  const { Products, loading, error } = useAppSelector((state) => state.product);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getProduct());

    const carousel = carouselRef.current;
    let scrollAmount = 0;
    const scrollStep = 2; // Adjust for speed
    const maxScroll = carousel?.scrollWidth || 0;

    const scrollCarousel = () => {
      if (carousel) {
        scrollAmount += scrollStep;
        if (scrollAmount >= maxScroll - carousel.offsetWidth) {
          scrollAmount = 0; // Reset scroll
        }
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const intervalId = setInterval(scrollCarousel, 50); // Auto-scroll interval
    return () => clearInterval(intervalId); // Cleanup on unmount
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

        <div className="space-y-4">
          <h2 className="text-2xl text-red-500 font-black">Product</h2>
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex gap-4 ml-2 py-1 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {Products.map((product) => (
              <div
                key={product.id}
                className="min-w-[241px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
