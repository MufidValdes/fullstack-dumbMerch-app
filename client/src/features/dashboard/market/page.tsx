import { Header } from '@/components/layout/header';
import { Card, CardFooter } from '@/components/ui/card';

const transaction = {
  item: 'wallpapers',
  date: 'Saturday, 14 Juli 2021',
  price: 'Rp.500.000',
  stock: 10,
  subTotal: '500.000',
  image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
};
export default function MarketPage() {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <Header />
      <div className="flex w-[100%] justify-between">
        {/* product Information */}
        <div className="space-y-4">
          <h2 className="text-2xl text-red-500 font-black">Product</h2>
          <div className="flex gap-10 ml-4">
            {/* card product */}
            <Card className="w-[241px] h-[410px] bg-[#212121] border-none">
              <img
                src="https://wallpapercave.com/wp/wp13357407.jpg"
                alt="Profile"
                className="rounded-lg w-[241px] h-[320px] object-cover "
              />
              <CardFooter>
                <div className="flex-col gap-2">
                  <h3 className="text-red-500 text-lg font-black">
                    {transaction.item}
                  </h3>
                  <p className="text-white text-[14px]">{transaction.price}</p>
                  <p className="text-red-500 text-[14px]">
                    {transaction.stock}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
