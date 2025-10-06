import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import WatchlistCard from '../components/WatchlistCard.jsx';

const WatchlistPage = () => {
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

  const bgColors = ['bg-[#171c20]', 'bg-[#15181f]', 'bg-[#13181e]', 'bg-[#11161a]', 'bg-[#0f1418]'];

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
          Authorization: `Bearer ${token}`,
        },
      });

      const watchlistItems = response.data.data.watchlist;
      const animeIds = watchlistItems.map((item) => item.animeId);

      const variables = {
        ids: animeIds,
      };

      const body = {
        query: watchlistDetailQuery,
        variables: variables,
      };

      const response2 = await axios.post('https://graphql.anilist.co', body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const animeDetailsList = response2.data.data.Page.media;

      let mergedWatchList = watchlistItems.map((item) => {
        const animeDetails = animeDetailsList.find((anime) => anime.id === item.animeId);
        return { ...item, ...animeDetails };
      });

      const plannedWatchList = mergedWatchList.filter((item) => item.status === 'Plan to Watch');
      const watchingWatchList = mergedWatchList.filter((item) => item.status === 'Watching');
      const completedWatchList = mergedWatchList.filter((item) => item.status === 'Completed');
      const droppedWatchList = mergedWatchList.filter((item) => item.status === 'Dropped');

      mergedWatchList = [plannedWatchList, watchingWatchList, completedWatchList, droppedWatchList];

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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      await fetchWatchlist();
      console.log(response); // TODO: CHECK IF 204 IS RETURNED LATER
    } catch (error) {
      console.log('Error deleting from watchlist: ', error);
    }
  };

  const updateWatchlist = async (dbId, { status, rating }) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/v1/watchlists/${dbId}`,
        { status, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

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
    <main className="h-screen w-screen pt-[50px]">
      <div className="flex flex-col justify-items-center items-start pb-14 px-7 lg:px-10 xl:px-14 2xl:px-18">
        {isLoading ? (
          <div className="flex justify-center w-full">
            <BeatLoader color="#3ac86a" />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            {errorMessage}
          </p>
        ) : (
          watchlist.map((animeList, index) => {
            if (animeList.length === 0) return null;

            return (
              <React.Fragment key={index}>
                <h1 className="text-2xl font-bold text-white not-first:mt-15 mb-3 relative">
                  {animeList[0].status}
                </h1>

                <div
                  className={`flex w-full items-center justify-between text-slate-300 py-4 pl-4 pr-5 bg-(--color-bg-secondary)`}
                >
                  <div className="flex items-center gap-x-6">
                    <div className="w-[70px] cursor-pointer relative rounded-md" />
                    <h2 className="text-base font-semibold">Title</h2>
                  </div>

                  <div className="grid grid-cols-3 text-center justify-items-center items-center w-[450px] h-full">
                    <h2 className="text-base font-semibold">Rating</h2>
                    <h2 className="text-base font-semibold">Episodes</h2>
                    <h2 className="text-base font-semibold">Type</h2>
                  </div>
                </div>

                {animeList.map((anime, index) => (
                  <WatchlistCard
                    key={anime.id}
                    anime={anime}
                    deleteFromWatchlist={deleteFromWatchlist}
                    updateWatchlist={updateWatchlist}
                    bgColor={bgColors[index % bgColors.length]}
                  />
                ))}
              </React.Fragment>
            );
          })
        )}
      </div>
    </main>
  );
};

export default WatchlistPage;
