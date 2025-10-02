import AnimeCard from '../components/AnimeCard.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const watchlistDetailQuery = `
  query ($ids: [Int]) {
    Page {
      media(id_in: $ids, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        averageScore
        format
        episodes
        duration
        coverImage {
          large
        }
      }
    }
  }
`;

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWatchlist = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:5001/api/v1/watchlist', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const watchlistItems = response.data.data.watchlist;
      const animeIds = watchlistItems.map(item => item.animeId);

      const variables = {
        ids: animeIds
      };

      const body = {
        query: watchlistDetailQuery,
        variables: variables
      };

      const response2 = await axios.post('https://graphql.anilist.co', body, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      setWatchlist(response2.data.data.Page.media);
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
    <main className="h-screen w-screen pt-[100px]">
      <div className="flex gap-y-14 gap-x-7 lg:gap-x-10 xl:gap-x-14 2xl:gap-x-18 justify-items-center pb-14 px-7 lg:px-10 xl:px-14 2xl:px-18">
        {isLoading ? (
          <div className="">
            <BeatLoader color="#3ac86a" />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            {errorMessage}
          </p>
        ) : (
          watchlist.map((anime) => {
            if (!anime.episodes) return null;
            return (
              <AnimeCard
                key={anime.id}
                title={
                  anime.title.english
                    ? anime.title.english
                    : anime.title.romaji
                }
                rating={anime.averageScore}
                image={anime.coverImage.large}
                format={anime.format}
                episodes={anime.episodes}
                duration={anime.duration}
              />
            );
          })
        )}
      </div>
    </main>
  );
};

export default WatchlistPage;