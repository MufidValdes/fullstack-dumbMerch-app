import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 mx-4">
      {/* Logo */}
      <Link to={'/'}>
        <img
          src="/src/assets/images/logo-dumbmerch.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>

      {/* Navbar Links */}
      <div className="flex gap-8">
        <NavLink
          to="/complain"
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 text-lg font-black'
              : 'text-white text-lg font-black'
          }
        >
          <Button
            variant="ghost"
            className="text-lg font-black"
          >
            Complain
          </Button>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 text-lg font-black'
              : 'text-white text-lg font-black'
          }
        >
          <Button
            variant="ghost"
            className="text-lg font-black"
          >
            Profile
          </Button>
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 text-lg font-black'
              : 'text-white text-lg font-black'
          }
        >
          <Button
            variant="ghost"
            className="text-lg font-black"
          >
            Logout
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
