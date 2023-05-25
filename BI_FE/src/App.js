import Home from './pages/Home';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import Configuration from './components/Configuration';
import Layout from './components/Layout';
import UserList from './components/users/UserList'
import RoleList from './components/roles/RoleList'
import { UserAndRolesContextProvider } from './context/UserAndRolesContext';
import ProtectedRoutes, { useAuth } from './components/ProtectedRoutes';
import Login from './pages/Login';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NotFound from './pages/NotFound';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

 const queryClient = new QueryClient({
  // defaultOptions : {
  //   queries : {
  //     retry : 3
  //   }
  // }
 });
 //Hi bro
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#46AE3D",
        contrastText: "white",
        light: "#A3FF9C",
      },
    },
    typography: {
      fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    shape: {
      borderRadius: "10px",
    },
    MuiButton: {
      root: {
        color: "white",
        border: "1px red solid",
      },
    },
  });
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const isLoggedIn = auth && location.pathname == '/login'
  useEffect(
    () => {
      if(location.pathname == '/') navigate('/reports')
      if(isLoggedIn) navigate("/reports");
    },[location]
  )

  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserAndRolesContextProvider>
          <Routes>
            <Route path = '/login' element = {<Login/>}/>
          <Route path="" element={<ProtectedRoutes />}>
            <Route
            path="/*"
            element={<NotFound/>}
            // element={<Navigate to="/reports" replace />}
          />  
            <Route path = '/reports' element = {<Home/>}/>
            <Route path="/settings/*" >
              <Route path="users" element={<UserList />} />
              <Route path="roles" element={<RoleList />} />
              <Route path="configuration" element={<Configuration />} />
            </Route>
          </Route>
         
          </Routes>
        </UserAndRolesContextProvider>
      </LocalizationProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </QueryClientProvider>
     </ThemeProvider>
  );
}

export default App;
