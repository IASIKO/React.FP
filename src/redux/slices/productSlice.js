import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../application";

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ product, isUpdating }, { dispatch }) => {
    const endpoint = isUpdating ? `/products/${product.id}` : "/products";
    const method = isUpdating ? "put" : "post";
    const { data } = await instance[method](endpoint, { product });
    dispatch(fetchHomePageProducts());
    return data;
  }
);

export const fetchHomePageProducts = createAsyncThunk(
  "product/fetchHomePageProduct",
  async () => {
    const { data } = await instance.get("/products");
    return data;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "product/fetchCategoryProducts",
  async (url) => {
    const { data } = await instance.get(`/products/categories/${url}`);
    return data;
  }
);

export const fetchQueryProducts = createAsyncThunk(
  "product/fetchQueryProducts",
  async (name) => {
    const { data } = await instance.get(`/products?name=${name}`);
    return data;
  }
);

export const fetchSingleProductById = createAsyncThunk(
  "product/fetchSingleProductById",
  async ({ id, category }) => {
    const { data } = await instance.get(`/products/category/${category}/${id}`);
    return data;
  }
);

export const rateProduct = createAsyncThunk(
  "product/rateProduct",
  async ({ productId, userId, url, rating, isHome }, { dispatch }) => {
    await instance.post(`/products/${productId}/users/${userId}/rate`, {
      rating,
    });
    if (!isHome) {
      dispatch(fetchCategoryProducts(url));
    } else {
      dispatch(fetchHomePageProducts());
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    selectedProduct: null,
    categories: [],
    homePageProducts: [],
    categoryProducts: [],
    searchResults: [],
    singleProduct: null,
    error: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload.product;
    },
    setSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveProduct.rejected, (state) => {
      state.loading = false;
      state.error = "something went wrong";
    });
    builder.addCase(fetchHomePageProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageProducts = action.payload.products;
      state.categories = action.payload.categories;
    });
    builder.addCase(fetchHomePageProducts.rejected, (state) => {
      state.loading = false;
      state.error = "couldn't fetch home page products, please refresh";
    });
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProducts = action.payload;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state) => {
      state.loading = false;
      state.error = "couldn't fetch category products";
    });

    builder.addCase(fetchQueryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQueryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.products;
    });
    builder.addCase(fetchQueryProducts.rejected, (state) => {
      state.loading = false;
      state.error = "something went wrong";
    });

    builder.addCase(fetchSingleProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload.product;
    });
    builder.addCase(fetchSingleProductById.rejected, (state) => {
      state.loading = false;
      state.error = "could not get product";
    });
  },
});

export const { setSelectedProduct, setSearchResults } = productSlice.actions;

export const productReducer = productSlice.reducer;
