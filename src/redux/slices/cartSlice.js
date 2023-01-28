import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../application";

export const fetchCart = createAsyncThunk("cart/fetchCart", async(userId) => {
  const {data} = await instance.get(`users/${userId}/cart`)
  return data
})

export const saveCart = createAsyncThunk("cart/saveCart", async({userId, cartItems}, {dispatch})=>{
  await instance.put(`/users/${userId}/cart`, {products: cartItems})
  dispatch(fetchCart(userId))
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cartItems: [],
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const productId = product._id;
      const cartItem = state.cartItems?.find(
        (item) => item.product._id === productId
      );
      if (cartItem) {
        const updatedCart = state.cartItems.map((cartItem) =>
          cartItem.product._id === productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
        state.cartItems = updatedCart;
      } else {
        state.cartItems.push({ product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const cartItems = state.cartItems?.find(
        (item) => item.product._id === productId
      );
      let updatedCart;
      if (cartItems.quantity === 1) {
        updatedCart = state.cartItems.filter(
          (item) => item.product._id !== productId
        );
      } else {
        updatedCart = state.cartItems?.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      state.cartItems = updatedCart
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveCart.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveCart.rejected, (state) => {
      state.loading = false;
      state.error = "will change to custom error";
    });
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cart;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.loading = false;
      state.error = "couldn't fetch cart";
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
