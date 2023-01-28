import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInitials, isUserAdmin } from "../../application/";
import { logoutUser, useUserInfo } from "../../redux";

export const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => {
    setAnchor(null);
  };
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box>
      <IconButton
        onClick={(event) => {
          setAnchor(event.currentTarget);
        }}
      >
        <Avatar>
          {getUserInitials(userInfo?.firstName, userInfo?.lastName)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        {!!userInfo && (
          <MenuItem>
            <Button
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              logout
            </Button>
            <Button>profile</Button>
          </MenuItem>
        )}
        {isUserAdmin(userInfo) && (
          <MenuItem>
            <Button onClick={() => {
              navigate("/products/new")
            }}>add product</Button>
          </MenuItem>
        )}
        {!userInfo && (
          <MenuItem>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              register
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
