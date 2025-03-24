import { useContext, useEffect, useState } from "react";
import { shopContext } from "../../context/ShopContext";
import Title from "../Title/Title";
import ProductItem from "../ProductItem/ProductItem";
import { useSelector } from "react-redux";

const LatestProducts = () => {
  const { products } = useContext(shopContext);
  const { items: data } = useSelector((state) => state.newArrival);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST " text2="PRODUCTS" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {/* Rendering Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
        {data?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
