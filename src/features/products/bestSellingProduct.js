import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

//data fetching

export const bestSellingFetching = createAsyncThunk(
  "bestproducts/bestSellingFetching",
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api-bestselling`
    );
    return res.data;
  }
);

export const bestSellingSlice = createSlice({
  name: "bestproducts/bestSellingFetching",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bestSellingFetching.pending, (state, action) => {
      state.status = "loading...";
    });
    builder.addCase(bestSellingFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(bestSellingFetching.rejected, (state, action) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default bestSellingSlice.reducer;
