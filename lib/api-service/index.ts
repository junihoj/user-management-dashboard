import axios from "axios";
// import { cookies } from "next/headers";
import { apiUrl } from "@/constants";
import { TApiService } from "@/types";

const globalAxios = axios.create({
  baseURL: apiUrl,
});

globalAxios.interceptors.request.use(
  async (config) => {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("THE REQUEST ERROR", error)
    if (error.response?.status === 401) {
      // Capture current path and search query
      const currentPath = window.location.pathname + window.location.search;
      const encodedPath = encodeURIComponent(currentPath);
      const decoded = decodeURIComponent(encodedPath);
      // Manually parse the search params (since `new URL()` requires a full URL)
      const searchParams = new URLSearchParams(decoded.split("?")[1] || "");

      // searchParams.delete("next"); // Remove "next" if it exists
      if (searchParams.get("next")) {
        const nextParam = searchParams.get("next");
        window.location.href = `/auth/sign-in?next=${nextParam}`;
        // const newPath =
        //   decoded.split("?")[0] +
        //   (searchParams.toString() ? `?${searchParams.toString()}` : "");
      } else {
        window.location.href = `/auth/sign-in?${searchParams.toString()}`;
      }
    }

    return Promise.reject(error);
  }
);

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const apiService: TApiService = ({
  url,
  method = "get",
  data,
  headers = defaultHeaders,
  otherConfig = {},
}) => {
  return globalAxios({
    url,
    method,
    data,
    headers,
    ...otherConfig,
  });
};
