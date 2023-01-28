import { AppBar, Badge, Box, Button, styled, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { UserIcon } from "./UserIcon";
import { MdShoppingCart } from "react-icons/md";
import { useCartItems } from "../../redux";
import { CartDrawer } from "./CartDrawer";

const StyledAppBar = styled(AppBar)(() => ({
  background: "#fff",
  color: "#103B66",
  width: "calc(100% - 250px)",
  padding: "0 100px 0 30px",
  display: "flex",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  textDecoration: "none",
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    width: "20px",
    height: "20px",
    color: "#fff",
    background: "#F33451",
    top: "2px",
    right: "-3px",
  },
}));

export const Header = () => {
  const cartItems = useCartItems();
  const cartItemsQuantity = cartItems.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <Box>
      <StyledAppBar>
        <StyledToolBar>
          <SearchBar />
          <UserIcon />
          <Button onClick={() => setIsCartOpen(true)}>
            <StyledBadge badgeContent={cartItemsQuantity}>
              <MdShoppingCart size={40} />
            </StyledBadge>
          </Button>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => {
              setIsCartOpen(false);
            }}
          />
        </StyledToolBar>
      </StyledAppBar>
    </Box>
  );
};
