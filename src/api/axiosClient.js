import axios from "axios";

const headers = {
  Accept: "application/json",
};
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers,
});

export const syncToken = () => {
  axiosClient.defaults.headers[
    "X-Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
};
export default axiosClient;
