import { IPaymentEntity } from '@/app/stores/payment/slice';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// TransactionRow component
interface TransactionTableRowProps {
  payment: IPaymentEntity[];
}

export function TransactionTable({ payment }: TransactionTableRowProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 backdrop-blur-sm flex flex-col h-full justify-between">
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/50">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                DATE & TIME
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                ORDER ID
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                TRANSACTION TYPE
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                CHANNEL
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                STATUS
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                AMOUNT
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium">
                CUSTOMER EMAIL
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {payment.map((payment) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }}
                className="transition-colors"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {format(new Date(payment.createdAt), 'dd MMM yyyy, HH:mm')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-mono">
                  {payment.order_transactionId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {payment.payment_type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  PayLater
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            payment.paymentStatus === 'Settlement'
                              ? 'bg-green-400/10 text-green-400'
                              : payment.paymentStatus === 'Pending'
                              ? 'bg-blue-400/10 text-blue-400'
                              : 'bg-red-400/10 text-red-400'
                          }`}
                  >
                    {payment.paymentStatus}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  Rp{payment.gross_amount.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {payment.order.user?.email}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-800 bg-gray-800/50 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">4</span> of{' '}
              <span className="font-medium">4</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center rounded-l-md border border-gray-700 bg-gray-800 px-2 py-2 text-sm font-medium hover:bg-gray-700">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="relative inline-flex items-center border border-gray-700 bg-gray-700 px-4 py-2 text-sm font-medium">
                1
              </button>
              <button className="relative inline-flex items-center rounded-r-md border border-gray-700 bg-gray-800 px-2 py-2 text-sm font-medium hover:bg-gray-700">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
