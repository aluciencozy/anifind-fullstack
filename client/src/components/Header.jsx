import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  return (
    <nav className="text-white flex justify-around items-center font-bold text-xl sm:text-2xl md:text-3xl">
      <h2 className="cursor-pointer">
        <Link to="/">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
            Ani
          </span>
          Find
        </Link>
      </h2>

      {user && (
        <div className="flex items-center justify-center">
          <Link to="/watchlist">
            <p className="sm:text-base text-sm relative after:w-0 after:h-0.5 after:bg-(--color-primary) after:absolute after:-bottom-[10%] after:-left-[12.5%] hover:after:w-[125%] after:transition-all after:duration-250 hover:text-(--color-primary) transition-colors duration-250 text-gray-300">
              Watch List
            </p>
          </Link>
        </div>
      )}

      <div className="flex gap-x-10 items-center justify-center font-semibold">
        {!user ? (
          <div className="flex gap-x-10 items-center justify-center">
            <Link
              to="/sign-in"
              className="sm:text-base text-sm relative after:w-0 after:h-0.5 after:bg-(--color-primary) after:absolute after:-bottom-[10%] after:-left-[12.5%] hover:after:w-[125%] after:transition-all after:duration-250 hover:text-(--color-primary) transition-colors duration-250 text-gray-300"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="sm:text-base text-sm bg-(--color-primary) rounded-sm px-3 py-1 hover:shadow-[0px_0px_15px_3px_rgba(59,200,106,0.4)] duration-300 hover:scale-110 transition-all ease-in-out"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <button
            onClick={handleSignOut}
            className="cursor-pointer sm:text-base text-sm relative after:w-0 after:h-0.5 after:bg-(--color-primary) after:absolute after:-bottom-[10%] after:-left-[12.5%] hover:after:w-[125%] after:transition-all after:duration-250 hover:text-(--color-primary) transition-colors duration-250 text-gray-300"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
