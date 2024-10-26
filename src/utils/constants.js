const isDevMode = process.env.NODE_ENV === "development";
const useProdUrlAnyway =
  process.env.VUE_APP_USE_PROD_URL && process.env.VUE_APP_USE_PROD_URL === "1";

const devUrl = "http://localhost:5000";
const prodUlr = "https://yahya-8csr.onrender.com";

export const BACKEND_BASE_URL =
  isDevMode && !useProdUrlAnyway ? devUrl : prodUlr;

export const AUTH_UI_URL = isDevMode
  ? "http://localhost:8081"
  : "https://yahya-id.yahyasalimi.com";
export const SITE_URL = isDevMode
  ? "http://localhost:8080"
  : "https://vartija.yahyasalimi.com";
