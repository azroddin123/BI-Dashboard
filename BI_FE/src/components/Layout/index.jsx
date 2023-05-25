import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavList from "./NavList";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import LogoPng from "../../assets/images/logo.png";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#46AE3D",
//       contrastText: "white",
//       light: "#A3FF9C",
//     },
//   },
//   typography: {
//     fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
//     fontSize: 14,
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//   },
//   shape: {
//     borderRadius: "10px",
//   },
//   MuiButton: {
//     root: {
//       color: "white",
//       border: "1px red solid",
//     },
//   },
// });
export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme()
  useEffect(
    () => {
      document.title = 'BI ' + location.pathname.replaceAll('/',' | ')
    },[location]
  )
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const isMobile = useMediaQuery('(max-width : 600px)')

  return (
    // <ThemeProvider theme={theme}>
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          open={open}
          sx={{
            background: "white",
            color: "#303030",
            height: {md : "65px",xs  : '56px'},
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "#FBFCFF",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems={'center'}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  width: "48px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
             <Typography fontSize={{md : "1.2rem",xs : '1rem'}} noWrap component="div">
                {location.pathname.slice(1).toUpperCase()}
              </Typography>
            </Box>
            <Profile />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#FBFCFF",
            },
          }}
        >
          <DrawerHeader>
            <img
              src={LogoPng}
              width="50px"
              style={{
                margin: "auto",
              }}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <NavList open={open} />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 5,pl : {xs : '4px',md : 3},pr : {xs : '3px',md : 3}  ,width : {xs : '80%',md : 'auto'}
      }}>
          <DrawerHeader />
          {/* <Typography variant="h3" textTransform={"capitalize"} mb={4}>
          {location.pathname.slice(1)}
        </Typography> */}
          {children}
        </Box>
      </Box>
    {/* // </ThemeProvider> */}
    </>

  );
}
