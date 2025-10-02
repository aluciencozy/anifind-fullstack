import AnimeCard from '../components/AnimeCard.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWatchlist = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:5001/api/v1/watchlists', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setWatchlist(response.data.data.watchlist);
    } catch (error) {
      console.error(`Error fetching watchlist: ${error}`);
      setErrorMessage('Error fetching watchlist. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <main>
      <h1 className="text-2xl text-white absolute z-50">My Watchlist</h1>
      {/* map AnimeCards here */}
    </main>
  );
};

export default WatchlistPage;