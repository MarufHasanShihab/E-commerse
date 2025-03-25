import React from "react";
// import { useDispatch } from "react-redux";

import { RiDeleteBin6Line } from "react-icons/ri";

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addtoCart,
  decreaseCart,
  removeFromCart,
} from "../../features/products/cartSlice";

// import {
//   addToCart,
//   decreaseCart,
//   removeFromCart,
// } from "../features/addToCart/addToCartSlice";

const CartItem = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecrease = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncrease = (product) => {
    dispatch(addtoCart(product));
  };

  return (
    <div className="flex py-3 gap-3 md:gap-3 border-b justify-center">
      <div className="aspect-square flex items-center w-[120px] overflow-hidden   md:w-[120px]">
        <img
          src={`${import.meta.env.VITE_APP_URL}/uploads/product/${
            product?.photos
          }`}
          alt={""}
          className="w-full object-cover"
        />
      </div>

      <div className="w-full flex flex-col overflow-hidden">
        <h3 className="md:text-lg text-sm truncate  ">{product?.name}</h3>

        <div className="text-sm text-[#0ea5e9] md:text-md font-bold mt-2">
          Price: ${product?.unit_price}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-base flex gap-5">
                Quantity:
                <button
                  className="hover:text-rose-500 text-2xl"
                  onClick={() => handleDecrease(product)}
                >
                  <AiOutlineMinusCircle />
                </button>
                <span>{product?.cartQuantity}</span>
                <button
                  className="hover:text-green-500 text-2xl"
                  onClick={() => handleIncrease(product)}
                >
                  <AiOutlinePlusCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="text-base hover:text-red-500 duration-500 justify-center"
        onClick={() => handleRemove(product)}
      >
        <RiDeleteBin6Line />
      </button>
    </div>
  );
};

export default CartItem;
