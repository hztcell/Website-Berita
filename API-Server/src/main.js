import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import sequelize from './config/database.js';
import News from './models/News.js';
import startScheduler from './scheduler.js';
import initWebSocket from './websocket.js';
import newsRoute from './routes/news.js';

const app  = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api/news', newsRoute);

(async () => {
  await sequelize.sync();
  console.log('Database synced');
  startScheduler();
  initWebSocket(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () =>
    console.log(`Server ready → http://localhost:${PORT}`));
})();