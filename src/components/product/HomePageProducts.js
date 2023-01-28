import { Grid } from "@mui/material";
import React from "react";
import { useHomePageProducts } from "../../redux";
import { ProductCard } from "./ProductCard";

export const HomePageProducts = () => {
  const homePageProducts = useHomePageProducts();
  return (
    <Grid container spacing={4} sx={{width: "100%"}}>
      {homePageProducts.map((product) => {
        return <ProductCard key={product._id} {...product}/>
      })}
    </Grid>
  );
};
