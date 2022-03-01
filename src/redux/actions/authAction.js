import axios from "axios";
import { login , authme, resetpassword, tambahartikel } from "../../api/auth";
import { syncToken } from "../../api/axiosClient";
var bcrypt = require('bcryptjs');

export function authLogin(payload) {
  return async (dispatch) => {
    dispatch(isloadingStart());
    try {
      const response = await login(payload);
      const data = response.data;

      dispatch(loginHandle(data));
      localStorage.setItem("token", data.token);
      dispatch({
        type: "loadingEnd",
      });

      return data;
    } catch (err) {
      dispatch({
        type: "loadingEnd",
      });

     
      let data = err.response.data
      return data
   
    }
  };
}

export const deleteartikel = (id) => {
  return (dispatch) => {
    axios.delete('http://127.0.0.1:8000/api/artikel/delete/'+id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error){
      console.log(error)
    })
  }
}

export function authMe() {
  return async (dispatch) => {
    dispatch(isloadingStart());
    syncToken()
    try {
      const response = await authme();
      const data = response.data;

      dispatch(loginHandle(data));
      localStorage.setItem("token", data.token);
      syncToken()
      dispatch({
        type: "loadingEnd",
      });
      return data;
    } catch (err) {
      dispatch({
        type: "loadingEnd",
      });

     
      let data = err.response.data
      return data
   
    }
  };
}

const isloadingStart = () => {
  return {
    type: "loadingStart",
  };
};

const loginHandle = (data) => {
  return {
    type: "Login",
    nama: data?.user?.name,
    email: data?.user?.email,

    token: data?.token,
  };
};

