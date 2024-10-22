import { Button } from '../ui/button';

export const Header = () => (
  <div className="flex justify-between items-center mb-8 mx-4">
    <img
      src="/src/assets/images/logo-dumbmerch.png"
      alt="Logo"
      width={50}
      height={50}
    />
    <div className="flex gap-8">
      <Button
        variant="ghost"
        className="text-lg text-white font-black"
      >
        Complain
      </Button>
      <Button
        variant="ghost"
        className="text-lg text-red-500 font-black"
      >
        Profile
      </Button>
      <Button
        variant="ghost"
        className="text-lg text-white font-black"
      >
        Logout
      </Button>
    </div>
  </div>
);
