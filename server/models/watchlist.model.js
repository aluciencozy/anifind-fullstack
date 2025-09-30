import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  animeId: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['Plan to Watch', 'Watching', 'Completed', 'Dropped'],
    default: 'Plan to Watch',
  },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
