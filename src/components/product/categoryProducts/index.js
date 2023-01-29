import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useQueryParam } from "../../../application";
import { fetchCategoryProducts, useCategoryProducts } from "../../../redux";
import { CategoryProductList } from "./CategoryProductList";
import { Paginate } from "./Paginate";
import { Sort } from "./Sort";

export const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const { value: page, changeQueryValue: changePage } = useQueryParam("page");
  const { value: sort, changeQueryValue: changeSort } = useQueryParam("sort");
  const categoryProducts = useCategoryProducts();

  useEffect(() => {
    changePage("page", 1);
  }, [sort]);

  useEffect(() => {
    dispatch(
      fetchCategoryProducts(`${categoryName}?page=${page}&size=1&sort=${sort}`)
    );
  }, [categoryName, page, sort]);
  return (
    <Box>
      <Sort sort={sort} changeSort={changeSort} />
      <CategoryProductList />
      <Paginate
        currentPage={page}
        totalPages={categoryProducts.totalPages}
        changePage={changePage}
        queryKey="page"
      />
    </Box>
  );
};
