import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5001/api/v1/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
          setUser(response.data.data);
        } catch (error) {
          console.log("Session expired or invalid", error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, [])

  const signUp = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/auth/sign-up', { username, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token);
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/auth/sign-in', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.data.token;
      localStorage.setItem('token', token);
      setUser(response.data.data.user);
    } catch (error) {
      console.log('Error signing in: ', error);
      throw error;
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  }

  const authInfo = {
    user,
    setUser,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
