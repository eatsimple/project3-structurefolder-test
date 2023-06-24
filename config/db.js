import { Sequelize } from 'sequelize';

const db = new Sequelize('project3', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

export default db;
