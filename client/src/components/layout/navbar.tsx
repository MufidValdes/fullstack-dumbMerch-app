import { MessageSquare, Play, Bell, Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex gap-1.5 justify-center items-center">
        <img
          src="https://res.cloudinary.com/dje40bx3b/image/upload/v1732637144/ecommerce_products/kxsnud5johi1cjtn2nso.png"
          alt="Logo"
          className="w-[40px] h-[40px] object-contain"
        />
        <h1 className="text-2xl font-bold text-wrap">DumbMerch</h1>
      </div>
      <div className="flex items-center space-x-4 bg-black p-4 rounded-full">
        {isOpen && (
          <div className="">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Play className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800"
        >
          <Search className="h-5 w-5" />
        </Button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-12 w-12 rounded-full bg-red-500 text-white shadow-md hover:shadow-lg transition-all focus:outline-none"
          type="button"
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:rotate-45">
            <Plus className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
