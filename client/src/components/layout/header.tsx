import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import CartIcon from '@/features/pages/market/component/shoppingCart';
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import Swal from 'sweetalert2';
import { logout } from '@/app/stores/auth/slice';
export const Header = () => {
  const dispatch = useAppDispatch();
  const countItemsCart = useAppSelector(
    (state) => state.cart.items?.cartItems?.length || 0
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: 'Akun Anda akan logout dan Anda harus login kembali untuk mengakses.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: 'Logout Berhasil',
          text: 'Anda telah berhasil keluar.',
          icon: 'success',
        });
        navigate('/login');
      }
    });
  };

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

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-lg font-black text-white"
        >
          Logout
        </Button>
        {/* <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? 'text-red-500 text-lg font-black'
              : 'text-white text-lg font-black'
          }
        >
        </NavLink> */}
      </div>
      <Link to="/cart">
        <div className="">
          <CartIcon itemCount={countItemsCart} />
        </div>
      </Link>
    </div>
  );
};
