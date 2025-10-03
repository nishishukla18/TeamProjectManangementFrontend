import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PrivateRoute = () => {
  const {isLoggedin} = useContext(AppContext)

  if (!isLoggedin) {
    // redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }

  // render the nested routes if logged in
  return <Outlet />;
};

export default PrivateRoute;