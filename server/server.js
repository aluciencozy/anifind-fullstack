import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import watchlistsRouter from './routes/watchlists.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://anifind-fullstack.vercel.app'];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/watchlists', watchlistsRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDB();
});
