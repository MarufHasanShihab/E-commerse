import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

//data fetching

export const categoryFetching = createAsyncThunk(
  "category/categoryFetching",
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api-categories`
    );
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryFetching.pending, (state, action) => {
      state.status = "loading...";
    });
    builder.addCase(categoryFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(categoryFetching.rejected, (state, action) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default categorySlice.reducer;
