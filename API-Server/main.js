import 'dotenv/config.js';
import { config } from 'dotenv';
config({ path: '../.env' });
import axios from 'axios';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

// 1. siapkan array full URL
const BASE  = process.env.API_URL.replace(/\/$/, ''); // buang trailing slash
const LIST  = process.env.API_LIST.split(',').map(s => s.trim());
const URLS  = LIST.map(slug => `${BASE}/${slug}`);

// 2. websocket setup
const server  = http.createServer();
const wss     = new WebSocketServer({ server });
const clients = new Set();
const cache   = new Set();        // url yang sudah pernah dikirim

function broadcast(obj) {
  const msg = JSON.stringify(obj);
  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}

async function fetchAll() {
    console.log("==================================================");
  for (const url of URLS) {
    try {
      const { data } = await axios.get(url);
      console.log("Get: " + url);
      const list = data.data || [];
      const baru = list.filter(item => !cache.has(item.url));

      baru.forEach(item => {
        cache.add(item.url);
        broadcast({ type: 'news', payload: item });
      });

      if (baru.length) console.log(`📢 ${baru.length} baru dari ${url}`);
    } catch (e) {
      console.error(`❌ gagal ${url}:`, e.message);
    }
  }
}

// 3. jalanin & loop
fetchAll();
setInterval(fetchAll, 60_000);

wss.on('connection', ws => {
  clients.add(ws);
  ws.on('close', () => clients.delete(ws));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`WS ready on ws://localhost:${PORT}`));