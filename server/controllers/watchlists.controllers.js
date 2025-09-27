const getWatchlist = (req, res) => {
  res.send('GET watchlist');
};

const addWatchlistItem = (req, res) => {
  res.send('POST watchlist item');
}

const getWatchlistItem = (req, res) => {
  res.send('GET watchlist item');
}

const updateWatchlistItem = (req, res) => {
  res.send('PUT watchlist');
};

const deleteWatchlistItem = (req, res) => {
  res.send('DELETE watchlist');
};

export { getWatchlist, addWatchlistItem, deleteWatchlistItem, getWatchlistItem, updateWatchlistItem }