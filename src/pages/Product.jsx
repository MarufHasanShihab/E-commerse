import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(shopContext);
  const [product, setProduct] = useState({});
  const [image, setImage] = useState([]);
  const [size, setSize] = useState("");
  useEffect(() => {
    const findProduct = products.find((product) => product._id === productId);
    setProduct(findProduct);
    setImage(findProduct.image[0]);
  }, [productId, products]);
  console.log();
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex flex-col sm:flex-row gap-12 ">
        {/* product img */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-hidden sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product?.image?.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                src={img}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full h-auto sm:w-[80%]">
            <img src={image} className="w-full" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h2 className="font-medium text-2xl mt-2">{product.name}</h2>
          <div className="flex gap-1 items-center mt-2">
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_dull_icon} className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          {product.sizes && (
            <div className="flex flex-col gap-4 mt-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {product?.sizes?.map((item, index) => (
                  <button
                    onClick={() => setSize(size === '' ? item : '')}
                    className={`border py-2 px-4 bg-gray-100 ${
                      size === item ? 'border-orange-500' : ''
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => addToCart(product._id,product.sizes, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 uppercase mt-8"
          >
            Add To Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 text-gray-500 text-sm flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border py-3 px-5 text-sm">Description</b>
          <p className="border py-3 px-5 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* Display Related Product */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
