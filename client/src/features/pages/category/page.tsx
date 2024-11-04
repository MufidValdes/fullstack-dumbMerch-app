import { addCategories, getCategories } from '@/app/stores/category/async';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ICategories } from '@/types/categories';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiEdit2Fill } from 'react-icons/ri';
import { NavIcons } from '../dashboard/page';
import CategoriesTable from './component/categoryTable';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<ICategories>();
  const avatar = useAppSelector((state) => state.profile.profile.avatar);
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = async (data: ICategories) => {
    await dispatch(addCategories(data));
    dispatch(getCategories());
    reset();
  };

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
        <div className="bg-black text-white p-8 rounded-md">
          {/* CategoryList Section */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex justify-between">
              <h2 className="text-2xl text-red-500 font-black">
                List Category
              </h2>
              <Dialog>
                <DialogTrigger className="flex items-center">
                  <RiEdit2Fill className="text-red-500" />
                  <Button
                    variant="ghost"
                    className="text-red-500"
                  >
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[600px] lg:max-w-[655px] bg-black text-white">
                  <DialogHeader>
                    <DialogTitle className="p-4 rounded-lg">
                      Add Category
                    </DialogTitle>
                  </DialogHeader>
                  <div className=" md:flex ">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-4 py-4 ml-4 p-4 rounded-lg">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category_name">Category Name</Label>
                          <Input
                            id="category_name"
                            placeholder="Category Name"
                            {...register('category_name')}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-red-500 mt-2"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading && (
              <div className="">
                <h1>Loading...</h1>
              </div>
            )}
            {error && (
              <div className="">
                <h1>Error: {error}</h1>
              </div>
            )}
            <CategoriesTable Categories={categories} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
