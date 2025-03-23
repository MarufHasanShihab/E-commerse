import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import Title from "../Title/Title";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopContext);
  const { cartItems: data, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  console.log(data);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div
          className="flex
                justify-between"
        >
          <p>Subtotal</p>
          <p>
            {currency}
            {cartTotalAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
