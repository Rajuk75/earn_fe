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

// Offer API endpoints
export const getAllOffers = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `v1/offer/get-all-offers?${queryString}`
      : 'v1/offer/get-all-offers';
    
    const response = await callApi({
      endpoint,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOfferById = async (offerId) => {
  try {
    const response = await callApi({
      endpoint: `v1/offer/${offerId}/offer-by-id`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trackOfferClick = async (offerId) => {
  try {
    const response = await callApi({
      endpoint: 'v1/offer/track-click',
      method: 'POST',
      body: { offerId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trackOfferCompletion = async (offerId, metadata = {}) => {
  try {
    const response = await callApi({
      endpoint: 'v1/offer/track-completion',
      method: 'POST',
      body: { offerId, metadata },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTrackings = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `v1/offer/user-trackings?${queryString}`
      : 'v1/offer/user-trackings';
    
    const response = await callApi({
      endpoint,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin only - Offer management
export const createOffer = async (offerData) => {
  try {
    const response = await callApi({
      endpoint: 'v1/offer/create',
      method: 'POST',
      body: offerData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOffer = async (offerId, updateData) => {
  try {
    const response = await callApi({
      endpoint: `v1/offer/${offerId}/update`,
      method: 'PUT',
      body: updateData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOffer = async (offerId) => {
  try {
    const response = await callApi({
      endpoint: `v1/offer/${offerId}/delete`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

