import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/v1/auth/sign-in', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token);

      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  return (
    <main className="w-full h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center bg-(--color-bg-secondary) h-[400px] w-[400px] rounded-lg shadow-lg p-10">
        <form onSubmit={handleSubmit} className="h-full w-full flex flex-col justify-center">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleChange} required className="bg-(--color-bg) mb-5" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleChange} required className="bg-(--color-bg) mb-5" />
          <button type="submit" className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200">Sign In</button>
        </form>
        <div className="flex flex-col justify-center items-center">
          <p className="text-white">Don't have an account?</p>
          <Link to="/sign-up" className="bg-(--color-primary) hover:bg-(--color-primary-hover) text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors duration-200">Sign Up</Link>
        </div>
      </div>
    </main>
  )
}

export default SignInPage