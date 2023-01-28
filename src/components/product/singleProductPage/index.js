import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProductById, useSingleProduct } from "../../../redux";

export const DetailedProduct = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {categoryName} = useParams()
  const singleProduct = useSingleProduct();

  useEffect(() => {
    dispatch(fetchSingleProductById({ id: state.id, category: categoryName }));
  }, [state.id]);
  return <div>DetailedProductPage</div>;
};
