import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/auth';
import { getUserById } from '../services/core.service';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data by ID
  const fetchUserData = async (userId) => {
    try {
      if (!userId) {
        console.warn('fetchUserData: userId is missing');
        return;
      }
      
      console.log('fetchUserData: Calling getUserById for userId:', userId);
      const response = await getUserById(userId);
      console.log('fetchUserData: Response received:', response);
      
      // Response structure: { status: 'success', data: { user, message } }
      const userData = response?.data?.user;
      if (userData) {
        console.log('fetchUserData: User data found, updating state');
        setUser(userData);
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.warn('fetchUserData: No user data in response', response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Initialize user from token or localStorage
  useEffect(() => {
    const initializeUser = async () => {
      // First, try to load user from localStorage
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }

      // Then, fetch fresh data from API if token exists
      const token = getToken();
      if (token) {
        try {
          // Decode token to get userId (simple base64 decode for JWT payload)
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.userId) {
            console.log('UserContext: Initializing user from token, userId:', payload.userId);
            await fetchUserData(payload.userId);
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
      setLoading(false);
    };

    initializeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  // Clear user data
  const clearUser = () => {
    setUser(null);
    removeToken();
    localStorage.removeItem('user');
  };

  // Set token and fetch user
  const login = async (token, userData) => {
    setToken(token);
    
    // Always fetch user data from API using token
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.userId) {
          console.log('login: Fetching user data for userId:', payload.userId);
          await fetchUserData(payload.userId);
        } else {
          console.warn('login: No userId found in token payload');
        }
      } catch (error) {
        console.error('Error fetching user after login:', error);
        // Fallback: use userData if provided and API call fails
        if (userData) {
          updateUser(userData);
        }
      }
    } else if (userData?._id) {
      // If no token but have user ID, fetch user data
      console.log('login: No token, fetching user by ID:', userData._id);
      await fetchUserData(userData._id);
    } else if (userData) {
      // Last resort: use provided userData
      updateUser(userData);
    }
  };

  const value = {
    user,
    loading,
    updateUser,
    clearUser,
    login,
    fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

