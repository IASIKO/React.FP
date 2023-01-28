import { Box, Button, Drawer, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { saveCart, useCartItems, useUserInfo } from "../../redux";
import { Typography } from "../shared";
import { clearCart } from "../../redux";
import { MdRemoveShoppingCart } from "react-icons/md";

const StyledItemBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  border: " solid black",
  margin: "8px",
  borderRadius: "10px",
  color: "black",
  fontWeight: "800",
}));
const StyledTotalBox = styled(Box)(() => ({
  padding: "8px",
  margin: "8px",
  border: "2px inset  blue",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "1000",
  backgroundColor: "blue",
}));
const StyledCartButton = styled(Button)(() => ({
  marginTop: "10px",
  color: "blue",
  "&:hover": {
    backgroundColor: "grey",
    color: "white",
  },
}));
const StyledEmptyCartBox = styled(Box)(() => ({
  padding: "10px",
  marginTop: "50%",
  display: "flex",
  fontSize: "20px",
  fontWeight: "700",
}));

export const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useCartItems();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const Total = () => {
    return cartItems?.reduce((acc, curr) => {
      const total = curr.product.price * curr.quantity;

      return acc + total;
    }, 0);
  };

  const isProductInCart = cartItems.length;

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      {cartItems.map((item) => {
        const { product, quantity } = item;
        const { price, name, _id } = product;
        return (
          <StyledItemBox key={_id}>
            <Typography>{name}</Typography>
            <Typography>x {quantity}</Typography>
            <Typography>$ {price * quantity}</Typography>
          </StyledItemBox>
        );
      })}
      {isProductInCart > 0 && (
        <StyledTotalBox>
          {" "}
          Total: <Total />
        </StyledTotalBox>
      )}

      {isProductInCart > 0 ? (
        <>
          {" "}
          <StyledCartButton
            onClick={() => {
              dispatch(clearCart());
              dispatch(saveCart({ userId: userInfo._id, cartItems: [] }));
            }}
          >
            clear Cart
          </StyledCartButton>
          {userInfo && (
            <StyledCartButton
              onClick={() => {
                dispatch(saveCart({ userId: userInfo._id, cartItems }));
              }}
            >
              save cart
            </StyledCartButton>
          )}
        </>
      ) : (
        <StyledEmptyCartBox>
          <MdRemoveShoppingCart size={50} color="blue" display={"flex"} /> Cart
          is empty
        </StyledEmptyCartBox>
      )}
    </Drawer>
  );
};
