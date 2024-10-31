import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface itemProps {
  itemCount: number;
}

function CartIcon({ itemCount }: itemProps) {
  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-white " />
      {itemCount > 0 && (
        <Badge
          variant="secondary"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full"
        >
          {itemCount}
        </Badge>
      )}
    </div>
  );
}

export default CartIcon;
