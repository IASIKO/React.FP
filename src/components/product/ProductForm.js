import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../application";
import { saveProduct, setSelectedProduct, useSelectedProduct } from "../../redux";
import { TextFieldComponent } from "../shared";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { clearSelectedProduct } from "../../redux/slices/productSlice";

const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 1 ? null : "name should have at least 2 characters",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) =>
        description.length > 1
          ? null
          : "description should have at least 2 characters",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        category.length > 1
          ? null
          : "category should have at least 2 chracters",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "brand should have at least 2 chracters",
    },
    price: {
      value: selectedProduct?.price || 0,
      required: true,
      error: "",
      validateInput: (price) =>
        price.length > 0 ? null : "price should be positive number",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    onInputChange,
    setFormValues,
  } = useForm({
    defaultFormValues: generateAddProductFormValues(),
  });
  const selectedProduct = useSelectedProduct();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSaveProduct = () => {
    const name = productFormValues.name.value;
    const category = productFormValues.category.value;
    const description = productFormValues.description.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    dispatch(
      saveProduct({
        product: {
          name,
          category,
          description,
          brand,
          price,
          image,
          id: selectedProduct?._id,
        },
        isUpdating: !!selectedProduct,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(clearSelectedProduct())
        navigate("/");
      });
    };

  useEffect(() => {
    if (selectedProduct) {
      setFormValues(generateAddProductFormValues(selectedProduct));
      setImage(selectedProduct.image)
    }
  }, [selectedProduct]);

  return (
    <FormControl fullWidth>
      <TextFieldComponent
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={productFormValues.name.error}
        helperText={productFormValues.name.error}
        label="name"
      />
      <TextFieldComponent
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={productFormValues.category.error}
        helperText={productFormValues.category.error}
        label="category"
      />
      <TextFieldComponent
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={productFormValues.description.error}
        helperText={productFormValues.description.error}
        label="description"
      />
      <TextFieldComponent
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label="brand"
      />
      <TextFieldComponent
        name="price"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={productFormValues.price.error}
        helperText={productFormValues.price.error}
        label="price"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setImage(base64);
        }}
      />
      <Button onClick={onSaveProduct}>save</Button>
    </FormControl>
  );
};

export default ProductForm;
