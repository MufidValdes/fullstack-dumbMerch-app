import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { NavLink } from 'react-router-dom';
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

export interface LinkItemProps {
  icon: IconType;
  routelink: string;
}
interface SidebarProps {
  icons: LinkItemProps[]; // Array objek dengan tipe IconType dan rute
  avatarSrc: string;
}

function Sidebar({ icons, avatarSrc }: SidebarProps) {
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
                ? 'bg-gray-700 p-2 rounded-full'
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}

export default Sidebar;
