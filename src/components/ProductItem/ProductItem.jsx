import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { shopContext } from "../../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

import { assets } from "../../assets/frontend_assets/assets";
import { useDispatch } from "react-redux";
import {
  addtoCart,
  addToSingleCart,
  removeAllFromCart,
} from "../../features/products/cartSlice";

const ProductItem = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartQuantity, setCartQuantity] = useState(1);
  const [colorAtr, setColorAtr] = useState(null);
  const [sizeAtr, setSizeAtr] = useState(null);

  const handleBuyNow = () => {
    dispatch(removeAllFromCart());
    dispatch(addToSingleCart({ ...product, sizeAtr, colorAtr, cartQuantity }));
    navigate("/place-order");
  };

  // const { _id, image, name, price } = product || {};
  const addToCartHandler = (product) => {
    dispatch(addtoCart(product, colorAtr, sizeAtr));
  };

  const { currency } = useContext(shopContext);
  return (
    <div className="text-gray-700 cursor-pointer border border-gray-500/20 rounded-lg p-4 flex flex-col gap-2">
      <Link
        to={`/product/${product.id}`}
        className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center"
      >
        <img
          src={`${import.meta.env.VITE_APP_URL}/uploads/product/${
            product?.photos
          }`}
          alt={name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <img className="h-3 w-3" src={assets.heart_icon} alt="heart_icon" />
        </button>
      </Link>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>
      {/* <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p> */}
      <div className="flex items-center gap-2">
        {product?.after_discount > 0 ? (
          <>
            {/* ডিসকাউন্টের পরের মূল্য */}
            <p className="text-base font-medium">${product.after_discount}</p>

            {/* আগের মূল্য (discounted price), যেটার উপর লাইন থাকবে */}
            <p className="text-base font-medium line-through text-gray-500">
              {currency}
              {product.unit_price}
            </p>
          </>
        ) : (
          // ডিসকাউন্ট না থাকলে শুধু আসল প্রাইস দেখাবে
          <p className="text-base font-medium">
            {currency}
            {product.unit_price}
          </p>
        )}
      </div>

      <div className="flex  items-center justify-between gap-5 w-full mt-1">
        <button onClick={() => addToCartHandler(product)}>
          <TiShoppingCart className="text-gray-500 text-2xl" />
        </button>

        <button
          onClick={handleBuyNow}
          className=" max-sm:hidden px-4 py-1.5 w-full text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
