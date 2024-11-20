import { FetchAllPaymentAsync } from '@/app/stores/payment/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { motion } from 'framer-motion';
import { Calendar, Download, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavIcons } from '../dashboard/page';
import { TransactionTable } from './component/transaction_table';

export default function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const payment = useAppSelector((state) => state.payment.pay);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchAllPaymentAsync());
  }, [dispatch]);

  const avatar = useAppSelector((state) => state.profile.profile.avatar);
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* sidebar */}

      <Sidebar
        icons={NavIcons}
        avatarSrc={avatar!}
      />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Navbar />
        {/* Navbar */}
        <div className="bg-black text-white rounded-md p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-red-500">
                Transaction List
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search order ID here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors appearance-none">
                  <option>Filter</option>
                  <option>Settlement</option>
                  <option>Pending</option>
                  <option>Expired</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Date range"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <TransactionTable payment={payment} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
