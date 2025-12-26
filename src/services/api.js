const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.data?.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.data?.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

