import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

const useAuth = () => {
  const user = {loggedIn :localStorage.getItem('token')}
  return user && user.loggedIn
}

const ProtectedLogin = () => {
  const isAuth =useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedLogin;

