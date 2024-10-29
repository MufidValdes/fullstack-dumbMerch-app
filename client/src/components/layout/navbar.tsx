import { MessageSquare, Play, Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex gap-1.5 justify-center items-center">
        <img
          src="./src/assets/images/logo-dumbmerch.png"
          alt="Logo"
          className="w-[40px] h-[40px] object-contain"
        />
        <h1 className="text-2xl font-bold text-wrap">DumbMerch</h1>
      </div>
      <div className="flex items-center space-x-4 bg-black p-4 rounded-full">
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
