import { Header } from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@radix-ui/react-separator';

const users = {
  avatar: 'https://wallpapercave.com/wp/wp13357573.jpg',
};
export default function CustomerServicePage() {
  return (
    <div className="bg-black min-h-screen p-8 overflow-hidden">
      {/* Header */}
      <Header />
      <Separator
        orientation="horizontal"
        className="bg-[#6A6A6A]/30 h-1"
      />

      <div className="flex">
        {/* Left Side: Chat List */}
        <div className="w-1/4 min-h-[500px] p-4 border-e-2 border-[#6A6A6A]/30">
          <div className="flex items-center gap-4 p-2">
            <Avatar>
              <AvatarImage
                src={users.avatar}
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-white text-lg font-bold">Admin</h3>
              <p className="text-gray-400">
                Yes, Is there anything I can help?
              </p>
            </div>
          </div>
          {/* Add more users here if needed */}
        </div>

        {/* Right Side: Chat Box */}
        <div className="w-3/4 bg-black p-4">
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex flex-col gap-4 overflow-y-auto">
              {/* Admin Message */}
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage
                    src={users.avatar}
                    alt="avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="bg-gray-800 text-white p-3 rounded-lg max-w-[75%]">
                  Yes, Is there anything I can help?
                </div>
              </div>

              {/* User Message */}
              <div className="flex justify-end gap-2">
                <div className="bg-[#212121] text-white p-3 rounded-lg max-w-[75%]">
                  Hello Admin, I Need Your Help
                </div>
                <Avatar>
                  <AvatarImage
                    src={users.avatar}
                    alt="avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Message Input */}
            <div className="mt-auto p-4">
              <div className="flex items-center bg-[#212121] rounded-lg">
                <input
                  type="text"
                  placeholder="Send Message"
                  className="w-full bg-transparent p-3 text-white outline-none"
                />
                <button className="p-3 text-white">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
