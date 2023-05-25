import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import useUserAndRolesContext from "../hooks/useUserAndRolesContext";

const UserAndRolesContext = createContext(null);

let t = 0;

export const UserAndRolesContextProvider = ({ children }) => {

  const setDefaultHeaders = (TOKEN) => {
    axios.defaults.headers.common['Authorization'] = TOKEN;
  }

  useEffect(
   () => {
    setDefaultHeaders(localStorage.getItem('token'))
   },[]
  )
  const { roles, users, formDataContext } = useUserAndRolesContext();

  return (
    <UserAndRolesContext.Provider 
      value={{
        // roles-info
        roles,
        // users-info
        users,
        ...formDataContext,
        setDefaultHeaders
         }}>
      {children}
    </UserAndRolesContext.Provider>
  );
};

export default UserAndRolesContext