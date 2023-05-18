import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function apiAuthInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + sessionStorage.getItem("access-token"),
    },
  });

  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = "Bearer " + sessionStorage.getItem("access-token");
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}

export { apiInstance, apiAuthInstance };
