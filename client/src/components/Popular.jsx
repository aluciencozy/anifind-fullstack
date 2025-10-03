import axios from "axios";

const Popular = ({ currentSlide, topAnimeList }) => {
  const transformSlideX = `${currentSlide * -100}%`;

  const addToWatchList = async (animeId) => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/watchlists', {
        animeId: animeId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log(response);
    } catch (error) {
      console.error(`Error adding to watch list: ${error}`);
    }
  }

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      {/* Slider wrapper */}
      <ul
        className="flex w-[1000%] transition-transform duration-300"
        style={{
          transform: `translateX(${transformSlideX})`,
        }}
      >
        {topAnimeList.map((anime, index) => (
          <div
            className={`flex-none w-full object-cover h-[370px] sm:h-[400px] md:h-[450px] slg:h-[500px] relative flex justify-end`}
            key={anime.id}
          >
            {/* Gradient transitions */}
            <div className="absolute inset-0 gradient-overlay" />
            <div className="absolute bottom-0 right-0 top-0 left-[30%] md:left-[40%] lg:left-[35%] gradient-overlay-sm hidden sm:block" />

            <img
              src={anime.coverImage.extraLarge}
              className="w-full sm:w-[70%] md:w-[60%] h-full object-cover slg:hidden"
            />
            <img
              src={anime.bannerImage}
              className="w-full sm:w-[70%] md:w-[60%] lg:w-[65%] h-full object-cover hidden slg:inline-block"
            />

            {/* Anime info section */}
            <div className="absolute bottom-0 left-3.5 sm:left-7 lg:left-9 xl:left-11 2xl:left-18 text-white max-w-1/2">
              <h4 className="text-shadow-lg text-xs sm:text-sm lg:text-[15px] 2xl:text-lg text-(--color-primary)">
                #{index + 1} Popularity
              </h4>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl 2xl:text-6xl font-bold text-shadow-lg mt-0.5 sm:mt-1.5 md:mt-2">
                {anime.title.english}
              </h2>
              <p className="hidden sm:block mt-6 md:mt-6.5 text-xs lg:text-sm 2xl:text-[17px] text-gray-200 font-light">
                {anime.genres.join(" • ")}
              </p>
              <p
                className="line-clamp-2 invisible absolute sm:visible sm:relative mt-6 md:mt-6.5 text-sm lg:text-[15px] 2xl:text-lg"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              ></p>
              <button onClick={() => addToWatchList(anime.id)} className="text-xs sm:text-[16px] lg:text-lg 2xl:text-2xl bg-(--color-primary) rounded-2xl px-3 xl:px-3.5 py-2 xl:py-2.5 font-medium mt-5 sm:mt-6 md:mt-6.5 shadow-lg cursor-pointer">
                <i className="fas fa-bookmark"></i> Watch List
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
