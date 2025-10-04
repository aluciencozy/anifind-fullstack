import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'username') {
      setUsername(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/v1/auth/sign-up', { username, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token);

      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  return (
    <main className="w-full h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center bg-(--color-bg-secondary)/60 h-[500px] w-[500px] shadow-lg rounded-sm p-12">
        <div className="relative">
          <h1 className="text-3xl font-bold mb-5 text-shadow-lg after:h-0.5 after:w-[180%] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:bg-(--color-primary) after:shadow-xl">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
            Sign
            </span> Up
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="h-full w-full flex flex-col gap-y-5 justify-center">
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-(--color-primary) after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input type="text" id="username" name="username" value={username} placeholder=" " onChange={handleChange} required className="input-form peer focus:outline-none" />
            <label htmlFor="username" className="label-form peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500">Username</label>
          </div>
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-(--color-primary) after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input type="email" id="email" name="email" value={email} placeholder=" " onChange={handleChange} required className="input-form peer focus:outline-none" />
            <label htmlFor="email" className="label-form peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500">Email</label>
          </div>
          <div className="relative flex flex-col w-full after:w-full after:h-0.5 after:bg-(--color-primary) after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:content-[''] after:scale-x-0 after:origin-center focus-within:after:scale-x-100">
            <input type="password" id="password" name="password" value={password} placeholder=" " onChange={handleChange} required className="peer input-form focus:outline-none" />
            <label htmlFor="password" className="label-form peer-placeholder-shown:scale-100 peer-focus:scale-60 peer-focus:-translate-y-7 peer-focus:translate-x-[-20%] peer-[:not(:placeholder-shown)]:scale-60 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:translate-x-[-20%] peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-gray-500">Password</label>
          </div>
          <button type="submit" className="bg-(--color-primary) hover:bg-(--color-primary)/20 hover:text-(--color-primary) text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200 mt-5">Sign Up</button>
        </form>
        <div className="flex gap-x-2 justify-center items-center">
          <p className="text-white">Already registered?</p>
          <Link to="/sign-in" className="text-(--color-primary) hover:text-(--color-secondary) transition-colors duration-300">Sign In</Link>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage
