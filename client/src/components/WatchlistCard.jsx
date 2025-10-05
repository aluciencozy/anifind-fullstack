import { useState, useRef } from 'react'

const WatchlistCard = ({ anime, deleteFromWatchlist, updateWatchlist }) => {
  const dialogRef = useRef(null);

  const openModal = () => {
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  };

  return (
    <div className="flex w-full items-center justify-between bg-(--color-bg-secondary) text-white py-4 pl-4 pr-10 hover:bg-(--color-hover) transition-all duration-300">

      {/* Left half of the card */}
      <div className="flex items-center gap-x-4">
        <div className="w-[70px] h-[70px] cursor-pointer relative rounded-md">
          <div className="w-full h-full absolute scale-105 inset-0 bg-(--color-bg-secondary) opacity-0 hover:opacity-100 z-10 rounded-md transition-all duration-300">
            <i className="bx bx-edit text-2xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={openModal}></i>
          </div>
          <img src={anime.coverImage.extraLarge} alt={anime.title.english} className="w-full h-full object-cover rounded-md" />
        </div>
        <div>
          {anime.title.english}
        </div>
      </div>

      {/* Right half of the card */}
      <div className="grid grid-cols-3 items-center text-center gap-x-15">
        <div className="w-12">
          {anime.averageScore}
        </div>
        <div className="w-12">
          {anime.episodes}
        </div>
        <div className="w-12">
          {anime.format}
        </div>
      </div>

      {/*  Dialog/Modal */}
      <dialog ref={dialogRef} className="text-white absolute top-1/2 left-1/2 w-[700px] h-[500px] transform -translate-x-1/2 -translate-y-1/2 bg-(--color-bg-secondary) rounded-sm shadow-(--modal-shadow)">

        {/* Modal header */}
        <div className="w-full absolute">
          <div className="w-full h-[150px] shadow-(--header-shadow) relative">
            <button className="absolute right-5 top-5 z-10">
              <i className="bx bx-x text-2xl text-white cursor-pointer" onClick={closeModal}></i>
            </button>
            <div className="absolute inset-0 w-full h-full bg-(--color-bg-secondary) opacity-75" />
            <img src={anime.bannerImage} alt={anime.title.english} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Modal body */}
        <div className="w-full p-10 relative">
          <div className="flex items-center gap-x-4">
            <div className="w-[100px] h-[150px] cursor-pointer relative rounded-md shadow-lg">
              <img src={anime.coverImage.extraLarge} alt={anime.title.english} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="text-shadow-lg">
              {anime.title.english}
            </div>
          </div>
        </div>
      {/*  STATUS AND RATING SECTION HERE */}
      </dialog>
    </div>
  )
}
export default WatchlistCard
