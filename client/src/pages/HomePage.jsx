import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Popular from '../components/Popular';
import Search from '../components/Search';
import AnimeCard from '../components/AnimeCard';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

const searchQuery = `
  query ($search: String!) {
    Page {
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
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
          large,
          extraLarge
        }
      }
    }
  }
`;

const topAnimeQuery = `
  query {
    Page(perPage: 10) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        genres
        description
        bannerImage
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

const url = 'https://graphql.anilist.co';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeSearchList, setAnimeSearchList] = useState([]);
  const [topAnimeList, setTopAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchAnimeBySearch = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const variables = {
        search: searchTerm,
      };

      const body = {
        query: searchQuery,
        variables: variables,
      };

      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const animeArrayData = response.data.data.Page.media;

      setAnimeSearchList(animeArrayData);
    } catch (error) {
      console.error(`Error fetching anime by search: ${error}`);
      setErrorMessage('Error fetching anime. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnimeByRating = async () => {
    try {
      const body = {
        query: topAnimeQuery,
      };

      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const animeArrayData = response.data.data.Page.media;

      setTopAnimeList(animeArrayData);
    } catch (error) {
      console.error(`Error fetching top rated anime: ${error}`);
    }
  };

  const addToWatchList = async (animeId) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/v1/watchlists',
        {
          animeId: animeId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(`Error adding to watch list: ${error}`);
    }
  };

  useEffect(() => {
    fetchAnimeBySearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchAnimeByRating();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setCurrentSlide((prevSlide) => (prevSlide + 1) % 10), 4000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <main
        className="h-screen w-screen pt-[52px] sm:pt-[56px] md:pt-[60px] lg:pt-[68px]"
        id="home"
      >
        <Popular currentSlide={currentSlide} topAnimeList={topAnimeList} />

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid grid-cols-(--my-grid-cols) gap-y-14 gap-x-7 lg:gap-x-10 xl:gap-x-14 2xl:gap-x-18 justify-items-center pb-14 px-9 lg:px-12 xl:px-16 2xl:px-20">
          {isLoading ? (
            <div className="">
              <BeatLoader color="#3ac86a" />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              {errorMessage}
            </p>
          ) : (
            animeSearchList.map((anime) => {
              if (!anime.episodes) return null;
              return (
                <AnimeCard
                  key={anime.id}
                  title={anime.title.english ? anime.title.english : anime.title.romaji}
                  rating={anime.averageScore}
                  image={anime.coverImage.extraLarge}
                  format={anime.format}
                  episodes={anime.episodes}
                  addToWatchList={addToWatchList}
                  id={anime.id}
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
