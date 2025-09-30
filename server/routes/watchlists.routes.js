import {
  getWatchlist,
  addWatchlistItem,
  getWatchlistItem,
  updateWatchlistItem,
  deleteWatchlistItem,
} from '../controllers/watchlists.controllers.js';

import express from 'express';

const watchlistsRouter = express.Router();

watchlistsRouter.get('/', getWatchlist);

watchlistsRouter.post('/', addWatchlistItem);

watchlistsRouter.get('/:id', getWatchlistItem);

watchlistsRouter.put('/:id', updateWatchlistItem);

watchlistsRouter.delete('/:id', deleteWatchlistItem);

export default watchlistsRouter;
