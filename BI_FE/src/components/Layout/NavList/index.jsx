import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import PieChartIcon from '@mui/icons-material/PieChart';
import { useLocation, useNavigate } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Logout, Settings } from "@mui/icons-material";
import { NavDropDown, NavItem } from "./NavDropDown";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const NAVLIST_DATA = [
  // { id: 1, link: "dashboard", name: "Dashboard", icon: <DashboardIcon /> },
  { id: 2, link: "reports", name: "Reports", icon: <PieChartIcon />, isHashLinks : true,
    children : [
      { id: 1, link: "#daily-report", name: "Daily Report", icon: <EventIcon /> },
      { id: 2, link: "#montly-report", name: "Montly Report", icon: <CalendarMonthIcon /> },
      { id: 3, link: "#pl-report", name: "PL Report", icon: <CalendarMonthIcon /> },
    ]
  },
  {
    id: 3, link: "settings", name: "Settings", icon: <DisplaySettingsIcon />,
    children : [
      { id: 1, link: "/configuration", name: "Configuration", icon: <Settings /> },
      { id: 2, link: "/users", name: "Users", icon: <PeopleIcon /> },
      { id: 3, link: "/roles", name: "Roles", icon: <ManageAccountsIcon /> }
    ]
  },
 
  // { id: 3, link: "/banners", name: "Banners", icon: <ViewCarouselIcon /> },
  // { id: 4, link: "/testimonials", name: "Testimonials", icon: <FormatQuoteIcon /> },
  // { id: 5, link: "/about", name: "About", icon: <InfoIcon /> },
];

const NavList = ({ open }) => {
  const [show,setShow] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const handleClick = () => setShow(!show);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <List>
      {NAVLIST_DATA.map(nav => nav.children ? 
      <NavDropDown name = {nav.name} icon = {nav.icon} link = {nav.link} isHashLinks = {nav.isHashLinks}>{
        nav.children.map(navChild => <NavItem key = {navChild.id} {...navChild} link ={nav.link + navChild.link} open = {open}/>)
      }</NavDropDown>
      :  <NavItem {...nav}  open = {open}/>
      ) }
      <NavItem link = {""} name = "Logout" icon = {<Logout/>}  open = {open} onClick = {logoutHandler} />
    </List>
  );
};

export default NavList;
