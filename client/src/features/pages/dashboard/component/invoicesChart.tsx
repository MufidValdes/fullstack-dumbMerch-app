import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoicesChartProps {
  data: { date: string; quotation: number; approval: number }[];
}

export const InvoicesChart = ({ data }: InvoicesChartProps) => (
  <Card className="col-span-2 bg-gray-800 border-gray-700 text-white">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium">Invoices</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
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
);
