import express from 'express';
import cors from 'cors';
import allRoute from './src/routes/allRoute.js';
import db from './config/db.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allRoute);

// (async () => {
//   await db.sync({alter: true});
// })()

const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;
