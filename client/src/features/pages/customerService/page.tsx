// sesi user
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Header } from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@radix-ui/react-separator';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/app/stores/stores';

// Define the type for a message
type Message = {
  senderId: number;
  message: string;
};

const users = {
  avatar: 'https://wallpapercave.com/wp/wp13357573.jpg',
};

export default function CustomerServicePage() {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const adminId = '1';

  useEffect(() => {
    const socketConnection = io('http://localhost:3000', {
      query: { userId },
    });
    setSocket(socketConnection);

    socketConnection.on('roomJoined', (data) => {
      console.log('Joined room:', data.roomId);
    });

    socketConnection.on('previousMessages', (prevMessages: Message[]) => {
      setMessages(prevMessages);
    });

    // socketConnection.on('receiveChats', (message: Message) => {
    //   setMessages((prev) => [...prev, message]);
    // });

    return () => {
      socketConnection.disconnect();
    };
  }, [userId]);

  const handleSendMessage = () => {
    if (socket && input.trim()) {
      const messageData = {
        roomId: `${userId}${adminId}`,
        message: input,
        userId: +userId!,
      };
      socket.emit('sendChat', messageData);
      setMessages((prev) => [...prev, { senderId: +userId!, message: input }]);
      setInput('');
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
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
          </div>

          {/* Right Side: Chat Box */}
          <div className="w-3/4 bg-black p-4">
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div className="flex flex-col gap-4 h-[420px] overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.senderId === +userId!
                        ? 'justify-end'
                        : 'justify-start'
                    } gap-2`}
                  >
                    {msg.senderId !== +userId! && (
                      <Avatar>
                        <AvatarImage
                          src={users.avatar}
                          alt="avatar"
                          className="object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-[75%] ${
                        msg.senderId === +userId!
                          ? 'bg-[#212121] text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {msg.message}
                    </div>
                    {msg.senderId === +userId! && (
                      <Avatar>
                        <AvatarImage
                          src={users.avatar}
                          alt="avatar"
                          className="object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="mt-auto p-4">
                <div className="flex items-center bg-[#212121] rounded-lg">
                  <input
                    type="text"
                    placeholder="Send Message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-transparent p-3 text-white outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
