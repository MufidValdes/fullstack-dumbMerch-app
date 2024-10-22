import { Card, CardContent } from '@/components/ui/card';

export const TransactionCard = ({ transaction }: { transaction: any }) => (
  <Card className="flex bg-[#303030] border-none p-4 w-[420px] justify-between items-center mr-8">
    <div className="flex">
      <img
        src={transaction.image}
        alt={transaction.item}
        className="rounded w-[80px] h-[120px]"
      />
      <CardContent className="flex flex-col">
        <div className="space-y-2">
          <h3 className="text-red-500 text-sm font-black">
            {transaction.item}
          </h3>
          <p className="text-white text-[10px]">{transaction.price}</p>
          <p className="text-red-500 text-[9px]">{transaction.date}</p>
        </div>
        <div className="text-white text-[10px] font-black mt-4">
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
