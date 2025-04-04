import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

//data fetching

export const productFetching = createAsyncThunk(
  "products/productFetching",
  async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api-products`);
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productFetching.pending, (state, action) => {
      state.status = "loading...";
    });
    builder.addCase(productFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(productFetching.rejected, (state, action) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default productSlice.reducer;
