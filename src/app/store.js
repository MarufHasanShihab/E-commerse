import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/products/cartSlice";
import productSlice, {
  productFetching,
} from "../features/products/allProductSlice";
import categorySlice, {
  categoryFetching,
} from "../features/category/allCategorySlice";

export const store = configureStore({
  reducer: {
    //reducer in here
    cart: cartReducer,
    category: categorySlice,
    products: productSlice,
  },
});

store.dispatch(productFetching());
store.dispatch(categoryFetching());
