import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

//data fetching

export const newarrivalFetching = createAsyncThunk(
  "bestproducts/bestSellingFetching",
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api-newarrival`
    );
    return res.data;
  }
);

export const newarrivalSlice = createSlice({
  name: "bestproducts/bestSellingFetching",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newarrivalFetching.pending, (state, action) => {
      state.status = "loading...";
    });
    builder.addCase(newarrivalFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });
    builder.addCase(newarrivalFetching.rejected, (state, action) => {
      state.status = "Something Went Wrong";
    });
  },
});

export default newarrivalSlice.reducer;
