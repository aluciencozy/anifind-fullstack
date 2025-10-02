import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="text-white flex justify-between items-center font-bold text-xl sm:text-2xl md:text-3xl">
      <h2 className="cursor-pointer">
        <Link to="/">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
            Ani
          </span>
          Find
        </Link>
      </h2>
      <div className="">
        <Link to="/">
          <i className="bx bx-search cursor-pointer" />
        </Link>
        <Link to="/watchlist">
          <i className="bx bx-bookmark cursor-pointer" />
        </Link>
        <Link to="/sign-in">
          <i className="bx bx-user cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
