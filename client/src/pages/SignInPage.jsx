import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GridMotion from '../components/GridMotion.jsx';
import AuthContext from '../context/AuthContext.jsx';

const items = [<div key="jsx-item-1"></div>];

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to sign in. Please try again later';
      setFormError(message);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center -mt-[30px] text-white">
      <GridMotion items={items} />
      {formError && (
        <p className="absolute left-1/2 -translate-x-1/2 top-[15%] text-red-400 font-bold text-2xl">
          {formError}
        </p>
      )}
      <div className="flex flex-col items-center bg-(--color-bg-secondary)/60 h-[450px] w-[90%] sm:h-[500px] sm:w-[500px] shadow-lg rounded-sm md:p-12 sm:p-9 p-7">
        <div className="relative">
          <h1 className="text-3xl font-bold mb-5 text-shadow-lg after:h-0.5 after:w-[180%] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-(--color-primary) after:shadow-xl">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
              Sign
            </span>{' '}
            In
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col gap-y-5 justify-center"
        >
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-(--color-primary) after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder=" "
              onChange={handleChange}
              required
              className="input-form peer focus:outline-none"
            />
            <label
              htmlFor="email"
              className="label-form peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Email
            </label>
          </div>
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-(--color-primary) after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder=" "
              onChange={handleChange}
              required
              className="peer input-form focus:outline-none"
            />
            <label
              htmlFor="password"
              className="label-form peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="bg-(--color-primary) hover:bg-(--color-primary)/20 hover:text-(--color-primary) text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200 mt-5"
          >
            Sign In
          </button>
        </form>
        <div className="flex gap-x-2 justify-center items-center">
          <p className="text-white">Not registered?</p>
          <Link
            to="/sign-up"
            className="text-(--color-primary) hover:text-(--color-secondary) transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
