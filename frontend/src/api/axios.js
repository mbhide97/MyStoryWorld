
import axios from "axios";

// API URL: Local or Production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL: API_BASE_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const isPublicRequest =
      config.url?.includes("accounts/login/") ||
      config.url?.includes("accounts/register/") ||
      config.url?.includes("accounts/token/refresh/");

    if (isPublicRequest) {
      delete config.headers.Authorization;
      return config;
    }

    const token =
      localStorage.getItem("myStoryWorldAccessToken") ||
      sessionStorage.getItem("myStoryWorldAccessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// AUTOMATIC ACCESS TOKEN REFRESH
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("accounts/login/") &&
      !originalRequest.url?.includes("accounts/register/") &&
      !originalRequest.url?.includes("accounts/token/refresh/")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("myStoryWorldRefreshToken") ||
          sessionStorage.getItem("myStoryWorldRefreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token not found.");
        }

        const response = await refreshApi.post(
          "accounts/token/refresh/",
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;

        const storage = localStorage.getItem(
          "myStoryWorldRefreshToken"
        )
          ? localStorage
          : sessionStorage;

        storage.setItem(
          "myStoryWorldAccessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("myStoryWorldAccessToken");
        localStorage.removeItem("myStoryWorldRefreshToken");

        sessionStorage.removeItem("myStoryWorldAccessToken");
        sessionStorage.removeItem("myStoryWorldRefreshToken");

        localStorage.removeItem("myStoryWorldLogin");
        sessionStorage.removeItem("myStoryWorldLogin");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
