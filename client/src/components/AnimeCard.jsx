const AnimeCard = ({ title, rating, image, format, episodes, duration }) => {
  return (
    <div className="flex flex-col w-[230px]">
      <div className="relative">
        <div className="gradient-overlay w-full h-full absolute" />
        <img src={image} alt={title + "cover art"} className="w-full" />
        <div className="flex items-center absolute left-2.5 bottom-7 bg-(--color-secondary) rounded-md px-1 py-0.5 shadow-sm text-xs xl:text-sm 2xl:text-[16px] font-semibold">
          <i className="fa-solid fa-closed-captioning mr-1 text-[16px] xl:text-lg 2xl:text-xl"></i>
          {episodes}
        </div>
      </div>
      <div className="text-white">
        <h2 className="line-clamp-1 font-semibold xl:text-lg 2xl:text-xl">
          {title}
        </h2>
        <div className="flex text-xs xl:text-sm 2xl:text-[16px] text-gray-400 mt-1">
          <p>{format}</p>
          <span className="mx-2">•</span>
          <p>{duration}m</p>
          <span className="mx-2">•</span>
          <p>
            <i className="bx bxs-star mr-0.5 text-amber-400"></i>
            {rating / 10}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
