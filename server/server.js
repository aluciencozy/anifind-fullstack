import express from 'express';
import dotenv from 'dotenv';

import watchlistsRouter from './routes/watchlists.routes.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/watchlist', watchlistsRouter);
app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});