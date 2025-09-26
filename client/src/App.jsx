import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Popular from "./components/Popular";
import Search from "./components/Search";
import AnimeCard from "./components/AnimeCard";
import Header from "./components/Header";
import { BeatLoader } from "react-spinners";

const searchQuery = `
  query ($search: String!) {
    Page {
      media(search: $search, type: ANIME) {
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

const url = "https://graphql.anilist.co";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeSearchList, setAnimeSearchList] = useState([]);
  const [topAnimeList, setTopAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchAnimeBySearch = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const variables = {
        search: searchTerm,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          variables: variables,
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data = await response.json();
      const animeArrayData = data.data.Page.media;

      setAnimeSearchList(animeArrayData);
    } catch (error) {
      console.error(`Error fetching anime by search: ${error}`);
      setErrorMessage("Error fetching anime. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnimeByRating = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: topAnimeQuery,
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data = await response.json();
      const animeArrayData = data.data.Page.media;

      setTopAnimeList(animeArrayData);
    } catch (error) {
      console.error(`Error fetching top rated anime: ${error}`);
    }
  };

  useEffect(() => {
    fetchAnimeBySearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchAnimeByRating();
  }, []);

  useEffect(() => {
    const timerId = setInterval(
      () => setCurrentSlide((prevSlide) => (prevSlide + 1) % 10),
      4000
    );

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <header className="px-5 md:px-10 lg:px-15 xl:px-20 py-3 lg:py-4 bg-(--color-bg) w-full shadow-(--header-shadow) fixed z-10">
        <Header />
      </header>
      <main
        className="h-screen w-screen pt-[52px] sm:pt-[56px] md:pt-[60px] lg:pt-[68px]"
        id="home"
      >
        <Popular currentSlide={currentSlide} topAnimeList={topAnimeList} />

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid grid-cols-(--my-grid-cols) gap-y-14 gap-x-7 lg:gap-x-10 xl:gap-x-14 2xl:gap-x-18 justify-items-center pb-14 px-7 lg:px-10 xl:px-14 2xl:px-18">
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
    </>
  );
};

export default App;
