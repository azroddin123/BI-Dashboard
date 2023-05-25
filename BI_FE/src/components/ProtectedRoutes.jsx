import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "./Layout";

export const useAuth = () => {
  const user = localStorage.getItem("token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoutes = (props) => {
  const auth = useAuth();
  return auth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
