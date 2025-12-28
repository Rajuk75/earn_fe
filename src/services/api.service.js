import axios from "axios";
import { removeToken } from '../utils/auth';
import { ROOT_ROUTE } from "../constants/routeEnums";
import { ENV_LOCAL, USER_TYPE } from "../constants/userRoles";

const API_URL = import.meta.env.VITE_APP_STAGE === ENV_LOCAL 
  ? import.meta.env.VITE_API_URL || 'https://api.earnhubofficial.in/'
  : import.meta.env.VITE_API_URL || 'https://api.earnhubofficial.in/';

// Storage service functions
const storageService = {
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      // Try to parse as JSON, if fails return as string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      return localStorage.getItem(key);
    }
  },

  setItem: (key, value) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// Login utility function
const attemptLogout = () => {
  removeToken();
  // Clear any other user data if needed
};

// Main API call function
export default async function callApi({
  endpoint,
  method,
  body,
  service = "core",
  token,
}) {
  try {
    let authUser = storageService.getItem("token")
      ? storageService.getItem("token")
      : null;

    let headers = {};

    if (!(body instanceof FormData)) {
      headers["content-type"] = "application/json";
    }

    // Use provided token (for reset password) or stored auth token
    const tokenToUse = token || authUser;
    if (tokenToUse) {
      headers.Authorization = `Bearer ${tokenToUse}`;
    }

    let response = await axios({
      url: `${API_URL}/${endpoint}`,
      method,
      data: body,
      headers,
      timeout: 300000,
    });

    return response;
  } catch (e) {
    if (e.response?.status === 401) {
      let userType = storageService.getItem(USER_TYPE)
        ? storageService.getItem(USER_TYPE)
        : null;

      // Show notification if you have toast component
      // showNotification("Session expired. Please log in.", "error");
      attemptLogout();

      setTimeout(() => {
        if (userType) {
          window.location = ROOT_ROUTE;
        } else {
          window.location = ROOT_ROUTE;
        }
      }, 1000);
    }

    throw e instanceof Error ? e : new Error(e?.response?.data?.data?.message || e?.response?.data?.message || "API CALL Failed");
  }
}

