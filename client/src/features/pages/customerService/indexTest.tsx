// import { useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const ChatComponent = () => {
//   const { userId } = useParams();

//   const socket = useMemo(() => {
//     return io('http://localhost:3000', {
//       query: {
//         userId,
//       },
//     });
//   }, []);
//   const [connected, setConnected] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<
//     { message: string; userId: string; username: string }[]
//   >([]);
//   const [listRooms, setListRooms] = useState<string[]>([]);
//   const [selectedRoom, setSelectedRoom] = useState('');
//   const [userInfo, setUserInfo] = useState({ username: '', userId: userId });

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('connected');
//       setConnected(true);
//     });

//     socket.on(
//       'fullChats',
//       (data: { message: string; userId: string; username: string }[]) => {
//         setMessages(data);
//       }
//     );

//     socket.on('connected', (data) => {
//       console.log(data);
//       setListRooms(data.rooms);
//     });

//     socket.on('receiveChats', (data) => {
//       console.log(data);
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('receiveChats');
//     };
//   }, []);

//   return (
//     <>
//       <div>ChatComponent {connected ? 'Connected' : 'Disconnected'}</div>
//       <h1>list room</h1>
//       <div
//         style={{
//           display: 'flex',
//           height: '80vh',
//         }}
//       >
//         <div>
//           {listRooms.length > 0 &&
//             listRooms.map((room) => (
//               <div
//                 key={room}
//                 onClick={() => {
//                   setSelectedRoom(room);
//                   setMessages([]);
//                   socket.emit('getChats', { roomId: room });
//                 }}
//               >
//                 <button>Join Room {room}</button>
//               </div>
//             ))}
//         </div>
//         <div
//           style={{
//             flex: 1,
//             backgroundColor: 'gray',
//             display: selectedRoom ? 'flex' : 'none',
//             flexDirection: 'column',
//           }}
//         >
//           {messages?.length > 0 &&
//             messages.map((message) => (
//               <span
//                 key={message.message}
//                 style={{
//                   alignSelf:
//                     message.userId === userInfo.userId
//                       ? 'flex-end'
//                       : 'flex-start',
//                 }}
//               >
//                 {message.message}
//               </span>
//             ))}
//           <div style={{ marginTop: 'auto' }}>
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{ width: '100%' }}
//             />
//             <button
//               onClick={() =>
//                 socket.emit('sendChat', {
//                   roomId: selectedRoom,
//                   userId: userInfo.userId,
//                   username: userInfo.username,
//                   message,
//                 })
//               }
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatComponent;
