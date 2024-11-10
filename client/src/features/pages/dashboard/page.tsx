import { MoreHorizontal } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { FetchAllPaymentAsync } from '@/app/stores/payment/async';
import { useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar, { LinkItemProps } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { FaCartPlus, FaHome } from 'react-icons/fa';
import {
  TbCategoryPlus,
  TbMessageReportFilled,
  TbPigMoney,
} from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { StatsCard } from './component/statsCard';
import { StatusTable } from './component/statusTable';
import { TransactionTable } from '../transaction/component/transaction_table';
import { fetchUsers } from '@/app/stores/admin/async';

const invoiceData = [
  { date: '04 Jul', quotation: 5, approval: 20 },
  { date: '05 Jul', quotation: 15, approval: 35 },
  { date: '06 Jul', quotation: 10, approval: 25 },
  { date: '07 Jul', quotation: 20, approval: 30 },
  { date: '08 Jul', quotation: 12, approval: 25 },
  { date: '09 Jul', quotation: 5, approval: 15 },
  { date: '10 Jul', quotation: 8, approval: 20 },
];
const statusRows = [
  {
    id: 'KYRFQ0001',
    costumer_name: 'Bell Gardens',
    contact: '+91 700 838 1259',
    date: '03/03/2023',
    status: 'Pending',
    statusColor: 'red',
  },
  {
    id: 'KYRFQ0002',
    costumer_name: 'Bell Gardens',
    contact: '+91 700 838 1259',
    date: '03/03/2023',
    status: 'Approved',
    statusColor: 'green',
  },
];
export const NavIcons: Array<LinkItemProps> = [
  { icon: FaHome, routelink: '/dashboard' },
  { icon: TbMessageReportFilled, routelink: '/admin-complain' },
  { icon: TbCategoryPlus, routelink: '/category' },
  { icon: FaCartPlus, routelink: '/product' },
  { icon: TbPigMoney, routelink: '/transaction' },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const avatar = useAppSelector((state) => state.profile.profile.avatar);
  const payment = useAppSelector((state) => state.payment.pay);
  const users = useAppSelector((state) => state.auth.admin);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(FetchAllPaymentAsync());
  }, [dispatch]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Invoices Chart */}
          <Card className="col-span-2 bg-gray-800 border-gray-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Invoices</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={invoiceData}>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}k`}
                  />
                  <Bar
                    dataKey="quotation"
                    fill="#FFA07A"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="approval"
                    fill="#98FB98"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              title="Spend"
              value="$123,456"
              icon={FaCartPlus}
              bgColor="bg-[#E6D7D0]"
            />
            <StatsCard
              title="Supplier"
              value="12"
              icon={TbCategoryPlus}
              bgColor="bg-[#FFA07A]"
            />
            <StatsCard
              title="Spend"
              value="$123,456"
              icon={FaCartPlus}
              bgColor="bg-[#E6D7D0]"
            />
            <StatsCard
              title="Supplier"
              value="12"
              icon={TbCategoryPlus}
              bgColor="bg-[#FFA07A]"
            />
          </div>

          {/* Status Table */}
          <Card className="col-span-2 bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTable payment={payment} />
            </CardContent>
          </Card>

          <StatusTable users={users!} />
          {/* Invoice Donut Chart */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <svg
                  className="h-48 w-48"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#4B5563"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#FFA07A"
                    strokeWidth="10"
                    strokeDasharray="188.5 251.3"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-3xl font-bold fill-current"
                  >
                    $299
                  </text>
                </svg>
              </div>
              <div className="mt-4 space-y-2 text-white">
                <div className="flex items-center">
                  <span className="h-4 w-4 rounded-full bg-[#98FB98] mr-2" />
                  <span className="text-sm">Pending</span>
                  <span className="ml-auto text-sm">$175</span>
                </div>
                <div className="flex items-center">
                  <span className="h-4 w-4 rounded-full bg-[#FFA07A] mr-2" />
                  <span className="text-sm">Overdue</span>
                  <span className="ml-auto text-sm">$250</span>
                </div>
                <div className="flex items-center">
                  <span className="h-4 w-4 rounded-full bg-[#ADD8E6] mr-2" />
                  <span className="text-sm">Paid</span>
                  <span className="ml-auto text-sm">$884</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
