import axios from "axios";
import { DOMAIN } from "./apis";

const instance = axios.create({
  baseURL: DOMAIN,
  headers: {
    post: {
      ...axios.defaults.headers.post,
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
