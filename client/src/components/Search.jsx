const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div id="search" className="p-6 sm:p-12 flex flex-col justify-center items-center shrink-0">
      <div className="border-t-(--color-bg-secondary) border-t-2 shadow-sm">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl/15 xl:text-6xl 2xl:text-7xl text-white font-extrabold text-center my-8 xl:my-16 max-w-[20ch]">
          Find the{' '}
          <span className="bg-clip-text bg-linear-to-r from-(--color-secondary) to-(--color-primary) text-transparent">
            Anime
          </span>{' '}
          Everyone is Talking About
        </h1>
      </div>
      {/* Search container */}
      <div className="text-gray-400 placeholder:text-gray-400 bg-(--color-bg-secondary) rounded-sm flex items-center p-2 sm:p-3 md:p-3.5 lg:p-4 xl:p-5 2xl:p-6 text-sm sm:text-[16px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl shadow-sm lg:shadow-lg max-w-2xl lg:max-w-3xl 2xl:max-w-6xl w-full">
        <i className="bx bx-search mr-2 lg:mr-3 xl:mr-4" />

        <input
          type="text"
          placeholder="Search thousands of anime"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 focus:outline-0"
        />
      </div>
    </div>
  );
};

export default Search;
