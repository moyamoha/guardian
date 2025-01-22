import axios, { AxiosError } from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import useUiStore from "../store/ui.store";
import useAuthStore from "../store/auth.store";

axios.defaults.baseURL = BACKEND_BASE_URL;
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
axios.interceptors.response.use(
  function (resp) {
    if (resp.status >= 200 && resp.status < 300) {
      useUiStore().error = "";
    }
    return resp;
  },
  function (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.statusCode === 401
    ) {
      useAuthStore().logout("You are not logged in or session expired");
    } else {
      return Promise.reject(error);
    }
  }
);
