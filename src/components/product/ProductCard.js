import {
  Card,
  Grid,
  Typography,
  Box,
  styled,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../application";
import {
  addToCart,
  rateProduct,
  removeFromCart,
  setSelectedProduct,
  useCartItems,
  useUserInfo,
} from "../../redux";
import { Rating } from "./Rating";

const StyledCardContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "black",
  padding: "10px"
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const ProductCard = ({
  name,
  _id,
  image,
  price,
  category,
  brand,
  description,
  averageRating,
}) => {
  const cartItems = useCartItems();
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const isProductInCart = cartItems?.find((item) => item.product._id === _id);
  const navigate = useNavigate();

  const onEdit = () => {
    dispatch(
      setSelectedProduct({
        product: {
          name,
          _id,
          image,
          price,
          category,
          brand,
          description,
        },
      })
    );
    navigate(`/products/edit/${name}`);
  };

  const { pathname, search } = useLocation();

  const onRatingChange = (event) => {
    dispatch(
      rateProduct({
        productId: _id,
        userId: userInfo?._id,
        url: `${category}${search}&size=1`,
        isHome: pathname === "/",
        rating: event.target.value,
      })
    );
  };

  return (
    <Grid item>
      <Card>
        <Link
          style={{ textDecoration: "none" }}
          to={`/products/categories/${category}/${name}`}
          state={{ id: _id }}
        >
          <img
            src={image}
            alt={`${category} ${name} `}
            width="200px"
            height="200px"
          />
          <StyledCardContent>
            <Typography>{name}</Typography>
            <Typography>$ {price}</Typography>
          </StyledCardContent>
        </Link>
        <CardActions>
          <Rating
            value={averageRating}
            isDisabled={!userInfo}
            onChange={onRatingChange}
          />
          <StyledBox>
            {isProductInCart ? (
              <>
                <Button onClick={() => dispatch(removeFromCart(_id))}>-</Button>
                <Button
                  onClick={() => dispatch(addToCart({ _id, price, name }))}
                >
                  +
                </Button>
              </>
            ) : (
              <Button onClick={() => dispatch(addToCart({ _id, price, name }))}>
                add to cart
              </Button>
            )}
            {isUserAdmin(userInfo) && <Button onClick={onEdit}>edit</Button>}
          </StyledBox>
        </CardActions>
      </Card>
    </Grid>
  );
};
