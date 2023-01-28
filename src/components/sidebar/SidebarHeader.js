import { Link } from "react-router-dom";
import React from "react";
import { styled, Toolbar } from "@mui/material";
import logo from "../image/logo.png";

export const SidebarHeader = () => {
  const StyledSideBarHeader = styled(Toolbar)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "lightgrey",
      color: "white",
    },
  }));

  return (
    <div style={{ overflowX: "hidden" }}>
      <Link
        style={{
          textDecoration: "none",
          width: "250px",
          display: "flex",
          justifyContent: "center",
        }}
        to="/"
      >
        <img src={logo} width={"100px"} />
      </Link>
      <StyledSideBarHeader>
        <Link style={{ textDecoration: "none", width: "250px" }} to="/">
          Home
        </Link>
      </StyledSideBarHeader>
    </div>
  );
};
