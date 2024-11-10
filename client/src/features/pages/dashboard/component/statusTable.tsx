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
import { Iuser } from '@/types/users';

interface customerTableProps {
  users: Iuser[];
}

export const StatusTable = ({ users }: customerTableProps) => (
  <Card className="col-span-2 bg-gray-800 border-gray-700 text-white">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium">Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-y-auto max-h-80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>USER ID</TableHead>
              <TableHead>Costumer Name</TableHead>
              <TableHead>Costumer Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{'CST00' + row.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={row.profile.avatar}
                        className="object-cover"
                      />
                      <AvatarFallback>BG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{row.username}</div>
                      <div className="text-sm text-gray-500">{row.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.profile.phone}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full bg-emerald-700 px-2.5 py-0.5 text-xs font-medium text-gray-100`}
                  >
                    {'online'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);
