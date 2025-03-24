import { useContext, useEffect, useState } from "react";

import { getSubtotal, removeAllFromCart } from "../features/products/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartTotal/CartItem";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems: data, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  console.log(data);

  const goingToCheckout = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "begin_checkout", // Event name
        buttonName: "addtocart", // Additional data
        ecommerce: data,
      },
    });
  };

  useEffect(() => {
    dispatch(getSubtotal());
  }, [data, dispatch]);
  return (
    <div className="w-full px-3  container mx-auto min-h-screen">
      {data?.length > 0 ? (
        <div>
          <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-8">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
              Shopping Cart
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 py-5">
            <div className="left flex-[2]">
              <h3 className="text-2xl font-bold mb-3">Cart Items</h3>
              <div>
                {data?.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}

                {/* <CartItem /> */}
              </div>
              <div className="flex mt-5 justify-center text-center">
                <button
                  onClick={() => dispatch(removeAllFromCart())}
                  className="clear-btn uppercase border py-3 px-8 hover:bg-rose-200 hover:text-rose-600 font-medium hover:border-rose-200 duration-300"
                >
                  Clear cart
                </button>
              </div>
            </div>

            <div className="right flex-[1]">
              <h3 className="text-2xl font-bold mb-5">Summary</h3>
              <div className="p-3 flex flex-col gap-3  bg-black/[0.05] rounded-xl">
                <div className=" flex justify-between uppercase text-md  md:text-lg font-medium text-black">
                  Subtotal <span>${cartTotalAmount}</span>
                </div>

                <span className="text-sm md:text-md">
                  Taxes and shipping costs are calculated at the checkout
                </span>
                <Link
                  to={"/place-order"}
                  onClick={goingToCheckout}
                  className="px-4 py-3 rounded-md inline-block text-center  text-slate-50 hover:bg-[#0ea5e9] bg-[#0e90cc] duration-300 "
                >
                  CheckOut
                </Link>
                <Link
                  to={"/"}
                  className="text-[16.5px] text-[#0ea5e9] uppercase"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex text-[#0ea5e9]  flex-col text-2xl mt-10 items-center">
          <h3>Your Cart is Empty</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
