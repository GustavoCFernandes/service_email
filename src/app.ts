import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { config } from './config/index';
import { texts } from './utils/textLogs';
import routes from './routers';

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://dicap-frontend-react.vercel.app',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida pelo CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true,
  })
);

app.use('/', routes);

app.listen(config.port, () => {
   console.log(texts.start_server);
});
