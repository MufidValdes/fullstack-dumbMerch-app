import { HeaderAdmin } from '@/components/layout/headerAdmin';

const ProductEditForm = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <HeaderAdmin />

      {/* ProductEdit Section */}
      <div className="flex w-[100%] justify-between">
        {/* ProductEdit Information */}
        <div className="space-y-4">
          <h2 className="text-2xl text-red-500 font-black">Edit Product </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;
