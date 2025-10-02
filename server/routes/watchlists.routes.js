import {
  getWatchlist,
  addWatchlistItem,
  updateWatchlistItem,
  deleteWatchlistItem,
} from '../controllers/watchlists.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

import express from 'express';

const watchlistsRouter = express.Router();

watchlistsRouter.use(authMiddleware);

watchlistsRouter.get('/', getWatchlist);
watchlistsRouter.post('/', addWatchlistItem);
watchlistsRouter.put('/:id', updateWatchlistItem);
watchlistsRouter.delete('/:id', deleteWatchlistItem);

export default watchlistsRouter;
