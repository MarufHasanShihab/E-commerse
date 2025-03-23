import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      //if the item already in the cart
      const existedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      //if exist
      if (existedItemIndex >= 0) {
        //increase quantity
        state.cartItems[existedItemIndex].cartQuantity += 1;
        toast.info("Quantity Increased", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        //add to cart
        const assemblingItem = { ...action.payload, cartQuantity: 1 };
        toast.success("Product added", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.cartItems.push(assemblingItem);
      }
      //set data in local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      //filter item which are not deleted
      const updatedCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error("Product Removed", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //update the item
      state.cartItems = updatedCartItem;

      //updated local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeAllFromCart(state, action) {
      state.cartItems = [];
      // toast.error("Cart Cleared", {
      //   position: "bottom-left",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      //updated local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      //if item exist

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.warn("Quantity Decreased", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const updatedCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        toast.error("Product Removed", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.cartItems = updatedCartItem;
      }
      //updated local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getSubtotal(state, action) {
      const subTotal = state.cartItems.reduce((acc, item) => {
        const { after_discount, unit_price, cartQuantity } = item;
        const itemTotal =
          after_discount > 0
            ? after_discount * cartQuantity
            : unit_price * cartQuantity;
        acc += itemTotal;
        return acc;
      }, 0);

      state.cartTotalAmount = subTotal;
    },
    addToSingleCart: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload.id
      );

      if (item) {
        item.cartQuantity += action.payload.cartQuantity;
        item.colorAtr = action.payload.colorAtr;
        item.sizeAtr = action.payload.sizeAtr;
      } else {
        toast.success("Product added", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        state.cartItems.push(action.payload);
      }
      //updated local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addtoCart,
  removeFromCart,
  removeAllFromCart,
  decreaseCart,
  getSubtotal,
  addToSingleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
