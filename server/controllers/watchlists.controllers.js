import Watchlist from '../models/watchlist.model.js';
import CustomError from '../utils/CustomError.js';

const getWatchlist = async (req, res) => {
  const watchlist = await Watchlist.find({ user: req.user._id }).sort('-createdAt');
  res.status(200).json({ success: true, data: { watchlist, count: watchlist.length } });
};

const addWatchlistItem = async (req, res, next) => {
  const { animeId } = req.body;
  if (!animeId) return next(new CustomError('Please provide animeId', 400));

  const existingItem = await Watchlist.findOne({ animeId, user: req.user._id });
  if (existingItem) return next(new CustomError('Anime already in watchlist', 400));

  const watchlistItem = await Watchlist.create({ animeId, user: req.user._id });

  res.status(201).json({ success: true, data: watchlistItem });
};

const updateWatchlistItem = async (req, res, next) => {
  const { status } = req.body;

  const updatedItem = await Watchlist.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { status },
    { new: true }
  );

  if (!updatedItem) return next(new CustomError(`Item not found with id ${req.params.id}`, 404));

  res.status(200).json({ success: true, data: updatedItem });
};

const deleteWatchlistItem = async (req, res, next) => {
  const deletedItem = await Watchlist.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!deletedItem) return next(new CustomError(`Item not found with id ${req.params.id}`, 404));

  res.status(204).send();
};

export { getWatchlist, addWatchlistItem, deleteWatchlistItem, updateWatchlistItem };
