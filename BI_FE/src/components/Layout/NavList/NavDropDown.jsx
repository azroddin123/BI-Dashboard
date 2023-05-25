import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
import React from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavDropDown = ({name,icon, children,link, isHashLinks = false}) => {
    const location = useLocation();
    const isCurrentPage =  location.pathname.slice(1).split('/').includes(link)|| location.pathname.slice(1) + location.hash == link
    console.log(location.pathname,location.pathname.slice(1).split('/').includes(link) )
    const [show,setShow] = useState(false);
    const navigate = useNavigate()
    const handleClick = () => {setShow(!show); isHashLinks && isCurrentPage && navigate(link)}
  return (
    <>
    <ListItemButton onClick={handleClick} sx={
        (theme) =>
        ({ 
        // display: "block",
        border : '1px transparent solid',
        color : isCurrentPage ? theme.palette.primary.main : 'inherit',
        // color : isCurrentPage ? 'white': 'inherit'
      })}>
        <ListItemIcon
        sx = {theme => ({
        color : isCurrentPage ? theme.palette.primary.main : 'inherit',

          // color : isCurrentPage ? 'white': 'inherit'
        })}
        >
          {icon ||  'I'}
        </ListItemIcon>
        <ListItemText primary={name || "Name here"} />
        {show ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={show} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
       {children}
        </List>
      </Collapse>
    </>
  )
}


export const NavItem = ({link = "link_here",name = "Hi",open,icon, ...otherProps}) => {
    const location = useLocation()
    const isCurrentPage =  location.pathname.slice(1) == link || location.pathname.slice(1) + location.hash == link
    // console.log(isCurrentPage)
    // console.log(location.pathname.slice(1));
    // console.log(location);
    // console.log(link)
  return (
    <ListItem disablePadding sx={
        (theme) =>
        ({ 
        display: "block",
        backgroundColor : isCurrentPage ? theme.palette.primary.main : 'transparent',
        color : isCurrentPage ? 'white': 'inherit'
      })}
      {...otherProps}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={Link}
          to={link}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "0px",
              justifyContent: "center",
              // transition: "0.4s",
            color : isCurrentPage ? 'white': 'inherit'
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={name}
            sx={{ transition: "0.4s", opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
  )
}
