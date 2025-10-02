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

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/watchlist', watchlistsRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDB();
});
