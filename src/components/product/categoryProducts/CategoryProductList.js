import { Grid } from "@mui/material";
import React from "react";
import { useCategoryProducts } from "../../../redux";
import { GridComponent } from "../../shared";
import { ProductCard } from "../ProductCard";

export const CategoryProductList = () => {
  const categoryProducts = useCategoryProducts();
  return (
    <GridComponent>
      {categoryProducts.products?.map((product) => {
        return (
          <Grid item key={product._id}>
            <ProductCard {...product} />
          </Grid>
        );
      })}
    </GridComponent>
  );
};
