import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  bgColor: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
}: StatsCardProps) => {
  return (
    <Card className={`bg-${bgColor} text-white`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};
