import axios from "./axiosClient";

export function login(values) {
  return axios.post("/login", values);
}

export function authme() {
  return axios.get("/authme");
}

// export function resetpassword() {
//   return axios.put("/password/reset");
// }

export function deleteartikel() {
  return axios.post("/artikel/delete/{id}")
}
