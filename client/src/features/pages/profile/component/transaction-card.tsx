import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatToIDR } from '@/lib/utils';

export const TransactionCard = ({ transaction }: { transaction: any }) => (
  <Card className="flex bg-[#303030] border-none lg:m-auto">
    <img
      src={transaction.image}
      alt={transaction.item}
      className="rounded w-[80px] h-[80px] object-cover"
    />
    <div className="flex justify-between items-end h-[80px]  w-full">
      <CardContent className="flex-col w-[60%]">
        <h3 className="text-red-500  text-sm font-black">{transaction.item}</h3>

        <p className="text-white text-[12px]">
          @ {transaction.qty} x {formatToIDR(transaction.price)}
        </p>
        <p className="text-red-500 text-[12px]">{transaction.date}</p>
      </CardContent>
      <CardFooter className="flex">
        <p className="text-white text-[12px] font-semibold text-right">
          Sub Total:
          <p>{formatToIDR(transaction.subTotal)}</p>
        </p>
      </CardFooter>
      {/* <img
        src="https://res.cloudinary.com/dje40bx3b/image/upload/v1732637144/ecommerce_products/kxsnud5johi1cjtn2nso.png"
        alt="Dumb Merch"
        className="object-contain h-[50px]"
      /> */}
    </div>
  </Card>
);
