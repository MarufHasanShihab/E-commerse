import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import Title from "../Title/Title";

const CartTotal = ({ shippingCost, cartTotalAmount, grandTotal }) => {
  const { currency } = useContext(shopContext);

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
            {shippingCost}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {grandTotal}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
