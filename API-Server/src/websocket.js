import { Server } from 'socket.io';
import News from './models/News.js';

let io;

export default function initWebSocket(server) {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', async (socket) => {
    console.log('WS client connected:', socket.id);

    const latest = await News.findAll({
      order: [['isoDate', 'DESC']],
      limit: 10,
    });
    socket.emit('news', latest);
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized yet');
  return io;
}