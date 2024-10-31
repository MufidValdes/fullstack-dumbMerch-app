import { Card, CardContent } from '@/components/ui/card';

export const TransactionCard = ({ transaction }: { transaction: any }) => (
  <Card className="flex bg-[#303030] border-none p-4 w-[100%] max-w-[500px] h-[80px] lg:m-auto">
    <div className="flex justify-between items-center">
      <img
        src={transaction.image}
        alt={transaction.item}
        className="rounded w-[80px] h-[80px] object-cover"
      />
      <CardContent className="flex h-full gap-2">
        <div className="">
          <h3 className="text-red-500  text-sm font-black">
            {transaction.item}
          </h3>
          <p className="text-white text-[12px]">{transaction.price}</p>
        </div>
        <p className="text-red-500 text-[12px]">{transaction.date}</p>
        <div className="text-white text-[12px] font-semibold">
          Sub Total: {transaction.subTotal}
        </div>
      </CardContent>
      <img
        src="./src/assets/images/logo-dumbmerch.png"
        alt="Dumb Merch"
        className="object-contain h-[50px]"
      />
    </div>
  </Card>
);
