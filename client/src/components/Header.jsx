import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

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
        <button onClick={signOut}>
          <i className="bx bx-log-out cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Header;
