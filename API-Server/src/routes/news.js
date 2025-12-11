import express from 'express';
import News from '../models/News.js';
const router = express.Router();

router.get('/', async (_req, res) => {
  const rows = await News.findAll({
    order: [['isoDate', 'DESC']],
    limit: 100,
  });
  res.json(rows);
});

export default router;