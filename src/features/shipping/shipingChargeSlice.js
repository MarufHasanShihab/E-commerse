import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  items: null,
  status: null,
};

export const shippingChargeFetching = createAsyncThunk(
  "shippingCharge/shippingChargeFetching",

  async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api-shipping`);
    return res.data;
  }
);

export const shippingChargeSlice = createSlice({
  name: "shippingCharge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shippingChargeFetching.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(shippingChargeFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });

    builder.addCase(shippingChargeFetching.rejected, (state) => {
      state.status = "Something went wrong";
    });
  },
});

export default shippingChargeSlice.reducer;
