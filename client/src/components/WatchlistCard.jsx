import { useState, useRef, useEffect } from 'react';

const WatchlistCard = ({ anime, deleteFromWatchlist, updateWatchlist, bgColor }) => {
  const dialogRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState(anime.status);
  const [rating, setRating] = useState(anime.rating.toString());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    dialogRef.current.showModal();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    dialogRef.current.close();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dialogRef.current) return;

      const rect = dialogRef.current.getBoundingClientRect();

      const isClickOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isClickOutside && isModalOpen) closeModal();
    };

    if (isModalOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const statusOptions = ['Watching', 'Completed', 'Dropped', 'Plan to Watch'];

  const handleStatusClick = (option) => {
    setIsDropdownOpen(false);
    setStatus(option);
  };

  const handleIncrement = () => {
    setRating((prevRating) => {
      const currentValue = parseFloat(prevRating) || 0;
      const newValue = currentValue + 0.5;
      return Math.min(10, newValue);
    });
  };

  const handleDecrement = () => {
    setRating((prevRating) => {
      const currentValue = parseFloat(prevRating) || 0;
      const newValue = currentValue - 0.5;
      return Math.max(0, newValue);
    });
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setRating('');
    } else {
      setRating(parseFloat(value));
    }
  };

  const handleBlur = () => {
    let numericValue = parseFloat(rating);

    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    const clampedValue = Math.max(0, Math.min(10, numericValue));

    setRating(clampedValue);
  };

  const handleSave = () => {
    updateWatchlist(anime._id, { status, rating });
  };

  const handleDelete = () => {
    deleteFromWatchlist(anime._id);
  };

  return (
    <div
      className={`flex w-full items-center justify-between ${bgColor} text-slate-300 py-4 pl-4 pr-5 hover:bg-(--color-hover) transition-all duration-300`}
    >
      {/* Left half of the card */}
      <div className="flex items-center gap-x-6">
        <div className="w-[70px] h-[70px] cursor-pointer relative rounded-md">
          <div
            className={`w-full h-full absolute inset-0 ${bgColor} opacity-0 hover:opacity-100 z-10 rounded-sm transition-all duration-300`}
            onClick={openModal}
          >
            <i className="bx bx-edit text-2xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"></i>
          </div>
          <img
            src={anime.coverImage.extraLarge}
            alt={anime.title.english}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>{anime.title.english}</div>
      </div>

      {/* Right half of the card */}
      <div className="grid grid-cols-3 text-center justify-items-center items-center w-[450px] h-full">
        <div className="w-12 flex items-center gap-x-1">
          <span className="text-(--color-primary)">★</span>
          <span>{anime.rating}</span>
        </div>
        <div className="w-12">{anime.episodes}</div>
        <div className="w-12">{anime.format}</div>
      </div>

      {/*  Dialog/Modal */}
      <dialog
        ref={dialogRef}
        className="text-white text-lg fixed top-1/2 left-1/2 sm:w-[700px] sm:h-[500px] w-[90%] h-[600px] transform -translate-x-1/2 -translate-y-1/2 bg-(--color-bg-secondary) rounded-sm shadow-(--modal-shadow) overflow-hidden"
      >
        {/* Modal header */}
        <div className="w-full absolute">
          <div className="w-full h-[150px] shadow-(--header-shadow) relative">
            <button className="absolute right-5 top-5 z-10">
              <i className="bx bx-x text-2xl text-white cursor-pointer" onClick={closeModal}></i>
            </button>
            <div className="absolute inset-0 w-full h-full bg-(--color-bg-secondary) opacity-75" />
            {anime.bannerImage ? (
              <img
                src={anime.bannerImage}
                alt={anime.title.english}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-(--color-bg) opacity-75" />
            )}
          </div>
        </div>
        <div className="w-full sm:px-10 sm:pt-10 sm:pb-10 pb-5 px-5 pt-10 relative">
          <div className="flex items-center gap-x-4">
            <div className="w-[100px] sm:h-[150px] h-[130px] cursor-pointer relative rounded-md shadow-lg">
              <img
                src={anime.coverImage.extraLarge}
                alt={anime.title.english}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="text-shadow-lg sm:text-lg text-base font-semibold">
              {anime.title.english}
            </div>
          </div>
        </div>

        {/* Modal body */}
        <div className="w-full sm:px-10 px-5 flex sm:flex-row flex-col-reverse gap-x-5 gap-y-5">
          {/* Status */}
          <div className="w-full">
            <p className="text-sm text-gray-400 mb-2">Status</p>
            <div className="relative text-base w-52 text-gray-200">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer w-full bg-(--color-bg) flex justify-between items-center px-4 py-2 rounded-sm shadow-lg text-sm"
              >
                <span>{status}</span>
                <span
                  className={`${
                    isDropdownOpen ? '-rotate-180' : ''
                  } scale-125 transition-all duration-300`}
                >
                  <i className="bx bx-chevron-down text-lg text-gray-300"></i>
                </span>
              </button>
              <div
                className={`mt-2 absolute top-full left-0 bg-(--color-bg) shadow-lg rounded-md z-10 overflow-hidden transition-all duration-350 ease-in-out flex flex-col gap-y-1 w-full ${
                  isDropdownOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleStatusClick(option)}
                    className={`cursor-pointer w-full bg-(--color-bg) flex items-center px-4 py-2 rounded-sm text-sm ${
                      option === status ? 'text-(--color-primary)' : ''
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="w-full">
            <p className="text-sm text-gray-400 mb-2">Rating</p>
            <div className="relative w-52">
              <input
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="10"
                step="0.5"
                placeholder=" "
                value={rating}
                onChange={(e) => handleRatingChange(e)}
                onBlur={handleBlur}
                className="w-full bg-(--color-bg) text-sm text-gray-200 px-4 py-2 rounded-sm shadow-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col">
                <i
                  onClick={handleIncrement}
                  className="bx bx-chevron-up text-lg text-gray-300 cursor-pointer"
                ></i>
                <i
                  onClick={handleDecrement}
                  className="bx bx-chevron-down text-lg text-gray-300 cursor-pointer"
                ></i>
              </div>
            </div>
          </div>
        </div>

        {/* Delete and Save Buttons */}
        <div className="absolute bottom-0 left-0 w-full text-sm flex gap-x-10 items-center justify-end p-8 sm:p-10">
          <button
            onClick={handleDelete}
            className="cursor-pointer bg-red-400/80 flex justify-between items-center px-4 py-2 rounded-sm shadow-lg text-sm"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer bg-(--color-primary)/80 flex justify-between items-center px-4 py-2 rounded-sm shadow-lg text-sm"
          >
            Save
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default WatchlistCard;
