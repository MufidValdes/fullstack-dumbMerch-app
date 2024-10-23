import { Card, CardContent } from '@/components/ui/card';

export const TransactionCard = ({ transaction }: { transaction: any }) => (
  <Card className="flex bg-[#303030] border-none p-4 w-[480px] h-[120px] justify-between items-center">
    <div className="flex">
      <img
        src={transaction.image}
        alt={transaction.item}
        className="rounded w-[80px] h-[110px] m-auto object-cover"
      />
      <CardContent className="h-full my-2">
        <div className="mt-2">
          <h3 className="text-red-500 text-lg font-black">
            {transaction.item}
          </h3>
          <p className="text-white text-[12px]">{transaction.price}</p>
          <p className="text-red-500 text-[12px]">{transaction.date}</p>
        </div>
        <div className="text-white text-[14px] font-black mt-1">
          Sub Total: {transaction.subTotal}
        </div>
      </CardContent>
    </div>

    <img
      src="./src/assets/images/logo-dumbmerch.png"
      alt="Dumb Merch"
      className="object-contain h-[50px]"
    />
  </Card>
);
