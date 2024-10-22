import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DetailPage() {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <Header />

      <div className="flex justify-end">
        {/* Product Information */}
        <div className="w-full max-w-[1035px] space-y-4">
          <div className="flex flex-wrap gap-10">
            {/* Product Image */}
            <Card className="w-full max-w-[300px] max-h-[450px] bg-[#212121] border-none">
              <img
                src="https://wallpapercave.com/wp/wp13357407.jpg" // Replace with the actual image
                alt="Product"
                className="rounded-lg w-full h-full object-cover"
              />
            </Card>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full max-w-[500px] space-y-2">
              <h2 className="text-2xl text-red-500 font-black">Mouse</h2>
              <p>Stock: 600</p>

              {/* Product Specifications */}
              <ul className="list-disc pl-5 space-y-1">
                <li>Wireless Mouse</li>
                <li>Konektivitas wireless 2.4 GHz</li>
                <li>Jarak wireless hingga 10 m</li>
                <li>Plug and Play</li>
                <li>Baterai tahan hingga 12 bulan</li>
              </ul>

              {/* Product Description */}
              <p className="text-gray-400">
                Mouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol
                mouse yang ringan dan mudah dibawa. Mouse ini menggunakan
                frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur
                sensor canggih optik pelacakan dengan penerima USB yang kecil.
                Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup
                baterai). Mendukung sistem operasi Windows 7,8, 10 keatas, Mac
                OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-red-500 flex justify-end">
                Rp.300.900
              </div>

              {/* Buy Button */}
              <Button className="bg-red-500 w-full">Buy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
