import { useEffect, useState } from "react";

import CartTotal from "../components/CartTotal/CartTotal";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSubtotal, removeAllFromCart } from "../features/products/cartSlice";
import { shippingChargeFetching } from "../features/shipping/shipingChargeSlice";

const PleaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { cartItems: data, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shipping_cost: null,
    shipping_type: "Cash On Delivery",
  });

  const [resOK, setResok] = useState(false);

  const { items: shipping } = useSelector((state) => state.shippingCharge);

  useEffect(() => {
    dispatch(shippingChargeFetching());
    dispatch(getSubtotal());
  }, [dispatch]);

  let grand_total = cartTotalAmount + +formData.shipping_cost + 0;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.shipping_type === "Cash On Delivery") {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_URL}/place-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            item: cartItems,
            shipping_cost: formData.shipping_cost,
            shipping_type: formData.shipping_type,
            grand_total,
          }),
        });

        if (!res.ok) {
          setResok(true);
          throw new Error("Something Went Error");
        }
        if (res.ok) {
          setResok(false);
          dispatch(removeAllFromCart());
          navigate("/successpage");
        }
      } catch (err) {
        setResok(true);
        console.log(err.message);
      }
    }
  };

  const [method, setMethod] = useState("cod");

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-2">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Your Name</label>
          <input
            className="border border-gray-300 rounded py-3 px-3.5 w-full"
            type="text"
            placeholder="Your Name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Your Email</label>
          <input
            className="border border-gray-300 rounded py-3 px-3.5 w-full"
            type="emain"
            placeholder="Email address"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Your Address</label>
          <textarea
            required
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData.address}
            className="px-3 py-2 w-full rounded-md outline-none border focus:border-[#96680e] duration-300 resize-none"
            placeholder="Enter Your Address"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Your Number</label>
          <input
            className="border border-gray-300 rounded py-3 px-3.5 w-full"
            type="number"
            placeholder="Phone"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            value={formData.phone}
            required
          />
        </div>

        <div className="form-control flex flex-col gap-2  mb-3 bg-orange-600">
          <select
            required
            onChange={(e) =>
              setFormData({ ...formData, shipping_cost: e.target.value })
            }
            className="px-3 py-2  rounded-md outline-none border bg-[#F4A996] focus:border-[#96680e] duration-300"
          >
            <option value="">Select Area</option>
            {shipping?.map((data) => (
              <option className="" key={data?.id} value={data?.amount}>
                {data?.name}({data?.amount})
              </option>
            ))}
          </select>
        </div>

        <div className="w-full text-end ">
          <button
            onClick={handleFormSubmit}
            className="bg-black text-white text-sm my-8 px-16 py-3"
          >
            PLEASE ORDER
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div className="pt-8">
          <div className="">
            {cartItems?.map((product) => (
              <div
                key={product.id}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img
                    src={`${import.meta.env.VITE_APP_URL}/uploads/product/${
                      product?.photos
                    }`}
                    className="w-16 sm:w-20"
                  />
                  {/* after_discount > 0
            ? after_discount * cartQuantity
            : unit_price * cartQuantity; */}
                  <div>
                    <p className="sm:text-base font-medium">{product.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p>
                        {product?.after_discount > 0 ? (
                          <>
                            <p>${product.after_discount}</p>
                          </>
                        ) : (
                          <p>${product.unit_price}</p>
                        )}
                      </p>
                      <p>Quantity : {product.cartQuantity}</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm text-base">Ready to ship</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Title text1="PAYMENT" text2="METHOD" />
            {/* Payment method selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 min-w-80">
          <CartTotal
            shippingCost={formData.shipping_cost}
            data={data}
            cartTotalAmount={cartTotalAmount}
            grandTotal={grand_total}
          />
        </div>
      </div>
    </div>
  );
};

export default PleaceOrder;
