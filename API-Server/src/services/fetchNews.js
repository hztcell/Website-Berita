import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL  = process.env.API_URL;
const API_LIST = process.env.API_LIST.split(',');

export default async function fetchAllNews() {
  const all = [];
  for (const src of API_LIST) {
    try {
      const { data } = await axios.get(`${API_URL}/${src}`);
      if (data?.data) {
        all.push(...data.data.map(item => ({
          title: item.title,
          link: item.link,
          contentSnippet: item.contentSnippet,
          image: item.image || null,
          isoDate: new Date(item.isoDate),
          source: src,
        })));
      }
    } catch (e) {
      console.error(`[fetch] ${src} → ${e.message}`);
    }
  }
  return all;
}