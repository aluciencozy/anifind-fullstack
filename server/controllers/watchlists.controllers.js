import WatchList from '../models/watchlist.model.js';

const getWatchlist = (req, res) => {
  res.send('GET watchlist');
};

const addWatchlistItem = async (req, res, next) => {
  const { animeId } = req.body;

  if (!animeId) {
    const error = new Error('Anime ID is required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const watchlistItem = await WatchList.create({ animeId, user: req.user._id });

    res.status(201).json({ success: true, data: watchlistItem });
  } catch (e) {
    next(e);
  }
};

const getWatchlistItem = (req, res) => {
  res.send('GET watchlist item');
};

const updateWatchlistItem = (req, res) => {
  res.send('PUT watchlist');
};

const deleteWatchlistItem = (req, res) => {
  res.send('DELETE watchlist');
};

export {
  getWatchlist,
  addWatchlistItem,
  deleteWatchlistItem,
  getWatchlistItem,
  updateWatchlistItem,
};
