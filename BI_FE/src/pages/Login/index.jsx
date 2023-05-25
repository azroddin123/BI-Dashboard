import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { loginUrl } from "../../utils/urls";
import { useTheme } from "@emotion/react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import UserAndRolesContext from "../../context/UserAndRolesContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Vitesse Technology
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = useTheme();

export default function Login() {
  const saveProfile = () => {
    // save in cache token
  }
  const {setDefaultHeaders} = useContext(UserAndRolesContext)
  const {mutate, isLoading} = useMutation((data) => axios.post(loginUrl, formData));

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (event) => {
      event.preventDefault();
      if (!formData.email || !formData.password)
      return toast.error("Please Fill details");
      mutate(formData,{
        onError : (err) => toast.error(err.response.data.msg),
        onSuccess : res => {
          toast.success("User logged in");
          console.log(res.data.token)
          localStorage.setItem("token",'Bearer ' + res.data.token);
          setDefaultHeaders('Bearer ' + res.data.token)
          navigate("/reports");
        }
      })
    // axios
    //   .post(loginUrl, formData)
    //   .then((res) => {
    //     const { data: profile, token } = res.data;
    //     saveProfile(profile, token);
        // window.location.reload();
        // window.location.replace("/dashboard");
        
      // })
      // .catch((err) => alert("Not Found any user with this crendetials"));
     
  };

  return (
      <Grid
        container
        sx={{
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            padding: "1rem",
            marginLeft: "auto",
            background: "#ffffffbd",
            backdropFilter: "blur(4px)",
            boxShadow: "#9b9cc8 1rem 1rem 14px 17px",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type = 'email'
                    value={formData.email}
                    onChange={formDataHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={formDataHandler}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                //   background: "radial-gradient(at 31% 40%,#2079d3, #0d5caa)",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
  );
}
