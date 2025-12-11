import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const News = sequelize.define('News', {
  title: DataTypes.STRING,
  link:  DataTypes.STRING,
  contentSnippet: DataTypes.TEXT,
  image: {
  type: DataTypes.TEXT,
  allowNull: true,
  get() {
    const raw = this.getDataValue('image');
    return raw ? JSON.parse(raw) : null;
  },
  set(val) {
    this.setDataValue('image', JSON.stringify(val));
  },
},
  isoDate: DataTypes.DATE,
  source: DataTypes.STRING,
});

export default News;