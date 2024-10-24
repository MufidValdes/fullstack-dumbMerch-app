import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TableRowData {
  id: string;
  vendor: string;
  contact: string;
  date: string;
  status: string;
  statusColor: string;
}

interface StatusTableProps {
  rows: TableRowData[];
}

export const StatusTable = ({ rows }: StatusTableProps) => (
  <Card className="col-span-2 bg-gray-800 border-gray-700 text-white">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium">Status</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>RFQ ID</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Vendor Contact</TableHead>
            <TableHead>Apply Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>BG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{row.vendor}</div>
                    <div className="text-sm text-gray-500">{row.contact}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full bg-${row.statusColor}-100 px-2.5 py-0.5 text-xs font-medium text-${row.statusColor}-800`}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
