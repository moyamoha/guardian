import axios, { AxiosError } from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";
import useUiStore from "../store/ui.store";
import { useRouter } from "vue-router";

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
    const ui = useUiStore();
    if (
      error instanceof AxiosError &&
      error.response?.data.statusCode === 401
    ) {
      ui.error = "You are not logged in or session expired";
      useRouter().push("/");
    } else {
      return Promise.reject(error);
    }
  }
);
