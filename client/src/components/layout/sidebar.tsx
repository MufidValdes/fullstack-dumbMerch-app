import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IconType } from 'react-icons';
import { useAppDispatch } from '@/app/stores/stores';
import { logout } from '@/app/stores/auth/slice';
import Swal from 'sweetalert2';
export interface LinkItemProps {
  icon: IconType;
  routelink: string;
}
interface SidebarProps {
  icons: LinkItemProps[]; // Array objek dengan tipe IconType dan rute
  avatarSrc: string;
}
function Sidebar({ icons, avatarSrc }: SidebarProps) {
  const dispatch = useAppDispatch();
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
    <aside className="w-16 bg-black p-4 flex flex-col items-center justify-between">
      {/* Bagian ikon navigasi */}
      <div className="space-y-8">
        {icons.map((item, index) => (
          <NavLink
            key={index}
            to={item.routelink}
            className={({ isActive }) =>
              isActive
                ? 'bg-red-500 p-2 rounded-full'
                : 'p-2 rounded-full hover:bg-gray-700'
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full my-4"
            >
              <item.icon className="w-6 h-6 text-white" />
            </Button>
          </NavLink>
        ))}
      </div>
      {/* Bagian avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="flex w-10 h-10 border-2 rounded-full justify-center items-center">
            <AvatarImage
              src={avatarSrc}
              alt="@user"
              className="object-cover rounded-full w-10 h-10 border-2"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="mb-4 w-56 bg-white"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                to="/admin-profile"
                className="w-full"
              >
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={handleLogout}
              variant="ghost"
            >
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}

export default Sidebar;
