import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICategories } from '@/types/categories';
import CategoryRow from './categoryRow';

interface CategoriesTableProps {
  Categories: ICategories[];
}
const CategoriesTable = ({ Categories }: CategoriesTableProps) => (
  <Table>
    <TableCaption>A list of your recent Categorys.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">No</TableHead>
        <TableHead>Category Name</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="overflow-x-auto">
      {Categories.map((Category, index) => (
        <CategoryRow
          key={Category.id}
          index={index}
          category={Category}
        />
      ))}
    </TableBody>
  </Table>
);

export default CategoriesTable;
