import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || '../database/news.sqlite',
  logging: false,
});