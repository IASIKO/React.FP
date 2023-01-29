import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchSingleProductById,
  useSingleProduct,
} from "../../../redux";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyleTypography = styled(Typography)(() => ({
  margin: "20px",
  fontSize: "20px",
}));

export const DetailedProduct = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {categoryName} = useParams()
  const singleProduct = useSingleProduct();

  useEffect(() => {
    dispatch(fetchSingleProductById({ id: state.id, category: categoryName }));
  }, [state.id]);
  return (
    <Box>
      <img src={singleProduct?.image} />
      <Box>
        <StyleTypography> Name : {singleProduct?.name} </StyleTypography>
        <StyleTypography> Price : $ {singleProduct?.price} </StyleTypography>
        <StyleTypography> Brand : {singleProduct?.brand} </StyleTypography>
        <StyleTypography> Category : {singleProduct?.category} </StyleTypography>
        <StyleTypography> Description : {singleProduct?.description} </StyleTypography>
      </Box>
    </Box>
  )
};
