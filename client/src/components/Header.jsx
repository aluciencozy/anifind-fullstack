import React from "react";

const Header = () => {
  return (
    <div className="text-white flex justify-between items-center font-bold text-xl sm:text-2xl md:text-3xl">
      <h2 className="cursor-pointer">
        <a href="#home">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
            Ani
          </span>
          Find
        </a>
      </h2>
      <a href="#search">
        <i className="bx bx-search cursor-pointer" />
      </a>
    </div>
  );
};

export default Header;
