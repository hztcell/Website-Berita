import { Server } from 'socket.io';

let io;

export default function initWebSocket(server) {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', socket => {
    console.log('WS client connected:', socket.id);
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized yet');
  return io;
}