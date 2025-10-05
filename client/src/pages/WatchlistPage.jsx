import AnimeCard from '../components/AnimeCard.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import WatchlistCard from '../components/WatchlistCard.jsx'

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
        bannerImage
        coverImage {
          large,
          extraLarge
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
      const response = await axios.get('http://localhost:5001/api/v1/watchlists', {
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

      const animeDetailsList = response2.data.data.Page.media;

      const mergedWatchList = watchlistItems.map((item) => {
        const animeDetails = animeDetailsList.find((anime) => anime.id === item.animeId);
        return { ...item, ...animeDetails };
      })

      setWatchlist(mergedWatchList);
      console.log(mergedWatchList);
    } catch (error) {
      console.error(`Error fetching watchlist: ${error}`);
      setErrorMessage('Error fetching watchlist. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFromWatchlist = async (dbId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/v1/watchlists/${dbId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      await fetchWatchlist();
      console.log(response); // TODO: CHECK IF 204 IS RETURNED LATER
    } catch (error) {
      console.log('Error deleting from watchlist: ', error);
    }
  };

  const updateWatchlist = async (dbId, { status, rating }) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/watchlists/${dbId}`,
        { status, rating },
        {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      await fetchWatchlist();
      console.log(response); // TODO: CHECK IF 201 CREATED
    } catch (e) {
      console.log('Error updating watchlist: ', e);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <main className="h-screen w-screen pt-[100px]">
      <div className="flex flex-col justify-items-center pb-14 px-7 lg:px-10 xl:px-14 2xl:px-18">
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
              <WatchlistCard key={anime.id} anime={anime} deleteFromWatchlist={deleteFromWatchlist} updateWatchlist={updateWatchlist} />
              // <div key={anime.id} className="flex flex-col gap-y-5 h-full">
              //   <AnimeCard
              //     title={
              //       anime.title.english
              //         ? anime.title.english
              //         : anime.title.romaji
              //     }
              //     rating={anime.averageScore}
              //     image={anime.coverImage.large}
              //     format={anime.format}
              //     episodes={anime.episodes}
              //     duration={anime.duration}
              //   />
              //   {/* delete button */}
              //   <button onClick={() => deleteFromWatchlist(anime._id)} className="text-xs sm:text-[16px] lg:text-lg 2xl:text-2xl bg-(--color-primary) rounded-2xl px-3 xl:px-3.5 py-2 xl:py-2.5 font-medium mt-5 sm:mt-6 md:mt-6.5 shadow-lg cursor-pointer">
              //     <i className="fas fa-bookmark"></i> Watch List
              //   </button>
              //   {/* status section */}
              //   <div className="text-xs sm:text-[16px] lg:text-lg 2xl:text-2xl bg-(--color-primary) rounded-2xl px-3 xl:px-3.5 py-2 xl:py-2.5 font-medium mt-5 sm:mt-6 md:mt-6.5 shadow-lg cursor-pointer">
              //     <div>{anime.status}</div>
              //     {statusOptions.map((status) => (
              //       <div key={status} onClick={() => updateWatchlist(anime._id, status)} className="flex items-center gap-x-2">
              //         {status}
              //       </div>
              //     ))}
              //   </div>
              // </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default WatchlistPage;