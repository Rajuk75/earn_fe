import callApi from './api.service';

// User API endpoints
export const registerUser = async (userData) => {
  try {
    const response = await callApi({
      endpoint: 'v1/user/register',
      method: 'POST',
      body: userData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await callApi({
      endpoint: 'login',
      method: 'POST',
      body: loginData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await callApi({
      endpoint: `v1/user/${userId}/user-by-id`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (params = {}) => {
  try {
    // Convert params to query string
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `v1/user/get-all-users?${queryString}`
      : 'v1/user/get-all-users';
    
    const response = await callApi({
      endpoint,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAdmin = async (adminData) => {
  try {
    const response = await callApi({
      endpoint: 'v1/user/create-admin',
      method: 'POST',
      body: adminData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWalletByUserId = async (userId) => {
  try {
    const response = await callApi({
      endpoint: `v1/wallet/${userId}/wallet-by-user-id`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

