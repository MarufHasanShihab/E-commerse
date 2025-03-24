import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Parser } from "html-to-react";
import { toast } from "react-toastify";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import {
  addToSingleCart,
  removeAllFromCart,
} from "../features/products/cartSlice";

const Product = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.products.items);
  const htmlParser = new Parser();

  const singleProduct = useMemo(
    () => product.find((product) => product?.id === Number(productId)),
    [product, productId]
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [colorAtr, setColorAtr] = useState("");
  const [sizeAtr, setSizeAtr] = useState("");

  const [cartQuantity, setCartQuantity] = useState(1);

  const handleDecrease = useCallback(() => {
    setCartQuantity(cartQuantity === 1 ? 1 : (prev) => prev - 1);
    cartQuantity > 1 &&
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
  }, [cartQuantity]);

  const handleIncrease = useCallback(() => {
    setCartQuantity((prev) => prev + 1);
    toast.warn("Quantity Increased", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  console.log(singleProduct);

  const handleAddToCart = () => {
    dispatch(
      addToSingleCart({
        ...singleProduct.product,
        colorAtr,
        sizeAtr,
        cartQuantity,
      })
    );
  };

  const handleBuyNow = () => {
    if (
      singleProduct?.min_qty <= cartQuantity &&
      cartQuantity <= singleProduct?.current_stock
    ) {
      dispatch(removeAllFromCart());
      dispatch(
        addToSingleCart({
          ...singleProduct,
          sizeAtr,
          colorAtr,
          cartQuantity,
        })
      );
      navigate("/place-order");
    } else {
      if (singleProduct?.product?.min_qty > cartQuantity) {
        toast.warn(`please fullfil the min qty ${singleProduct?.min_qty}`, {
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
        toast.warn(`Not Enough Product in Our Stock`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex flex-col sm:flex-row gap-12 ">
        {/* product img */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* <div className="flex sm:flex-col overflow-x-hidden sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product?.image?.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                src={img}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div> */}
          <div className="w-full h-auto sm:w-[80%]">
            <img
              src={`${import.meta.env.VITE_APP_URL}/uploads/product/${
                singleProduct?.photos
              }`}
              className="w-full"
            />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h2 className="font-medium text-2xl mt-2">{singleProduct?.name}</h2>
          <div className="flex gap-1 items-center mt-2"></div>
          {singleProduct?.after_discount > 0 ? (
            <p className="mt-5 text-3xl font-medium">
              $ {singleProduct?.after_discount}
            </p>
          ) : (
            <p className="mt-5 text-3xl font-medium">
              $ {singleProduct?.unit_price}
            </p>
          )}

          <div className="flex gap-3">
            <span className="inline-block text-slate-600/50 text-[0.9rem] font-medium  uppercase items-center">
              Quantity :
            </span>
            <div className="flex items-center gap-4 ">
              <button
                className=" bg-slate-500/30 rounded-full flex justify-center items-center font-semibold text-xs h-5 w-5 hover:bg-[#218698] hover:text-white duration-500"
                onClick={() => handleDecrease(singleProduct)}
              >
                <AiOutlineMinus />
              </button>
              <span>{cartQuantity}</span>
              <button
                className=" bg-slate-500/30 h-5 w-5  rounded-full flex justify-center items-center hover:bg-[#218698] hover:text-white duration-500"
                onClick={() => handleIncrease(singleProduct)}
              >
                <BsPlus />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 uppercase mt-8"
            >
              Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 uppercase mt-8"
            >
              Order Now
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>
      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border py-3 px-5 text-sm">Description</b>
          <p className="border py-3 px-5 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="mt-5  md:w-4/5">
            {htmlParser.parse(singleProduct?.description)}
          </p>
        </div>
      </div>
      {/* Display Related Product */}
      {/* <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      /> */}
    </div>
  );
};

export default Product;
