import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/products/cartSlice";
import productSlice, {
  productFetching,
} from "../features/products/allProductSlice";
import categorySlice, {
  categoryFetching,
} from "../features/category/allCategorySlice";
import shippingChargeSlice from "../features/shipping/shipingChargeSlice";
import bestSellingSlice, {
  bestSellingFetching,
} from "./../features/products/bestSellingProduct";
import newarrivalSlice, {
  newarrivalFetching,
} from "../features/products/newArriableProduct";

export const store = configureStore({
  reducer: {
    //reducer in here
    cart: cartReducer,
    category: categorySlice,
    products: productSlice,
    bestSell: bestSellingSlice,
    newArrival: newarrivalSlice,
    shippingCharge: shippingChargeSlice,
  },
});

store.dispatch(productFetching());
store.dispatch(bestSellingFetching());
store.dispatch(newarrivalFetching());
store.dispatch(categoryFetching());
