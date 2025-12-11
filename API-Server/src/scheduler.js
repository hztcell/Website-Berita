import fetchAllNews from './services/fetchNews.js';
import News from './models/News.js';
import { getIO } from './websocket.js';

export default function startScheduler() {
  async function saveNews() {
    const items   = await fetchAllNews();
    const newOnly = [];                   

    for (const it of items) {
      const [record, created] = await News.findOrCreate({
        where: { link: it.link },
        defaults: it,                    
      });

      if (created) newOnly.push(record);  
    }

    if (newOnly.length) {
      console.log(`[${new Date().toISOString()}] New news inserted: ${newOnly.length}`);
    }

    if (newOnly.length) {
      const io = getIO();                 
      io.emit('news', newOnly);
    }
  }

  saveNews();    
  setInterval(saveNews, 30_000);
}