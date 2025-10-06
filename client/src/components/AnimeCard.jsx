const AnimeCard = ({ title, rating, image, format, episodes, addToWatchList, id }) => {
  return (
    <div className="flex flex-col w-[230px] group">
      <div className="relative group">
        <div className="gradient-overlay w-full h-full absolute" />
        <img src={image} alt={title + 'cover art'} className="w-full" />
        <div className="flex items-center absolute left-2.5 bottom-7 bg-(--color-secondary) rounded-md px-1 py-0.5 shadow-sm text-xs xl:text-sm 2xl:text-[14px] font-semibold">
          <i className="fa-solid fa-closed-captioning mr-1 text-[16px] xl:text-lg 2xl:text-xl"></i>
          {episodes}
        </div>
        <div
          onClick={() => addToWatchList(id)}
          className="flex items-center absolute right-2.5 bottom-7 bg-(--color-bg-secondary)/80 px-1 py-0.5 shadow-sm text-xs xl:text-sm 2xl:text-[16px] font-semibold text-white rounded-full cursor-pointer w-[28px] h-[28px] scale-0 group-hover:scale-100 transition-300 duration-250 hover:scale-115 hover:text-(--color-primary)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </div>
      </div>
      <div className="text-white group-hover:text-(--color-primary) transition-300 duration-250">
        <h2 className="line-clamp-1 font-semibold xl:text-lg 2xl:text-xl">{title}</h2>
        <div className="flex text-xs xl:text-sm 2xl:text-[16px] text-gray-400 mt-1">
          <p>{format}</p>
          <span className="mx-2">•</span>
          <p>
            <i className="bx bxs-star mr-1 text-(--color-primary)"></i>
            {rating / 10}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
