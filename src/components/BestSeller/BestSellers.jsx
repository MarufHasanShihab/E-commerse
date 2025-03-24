import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Title from "../Title/Title";
import { shopContext } from "../../context/ShopContext";
import { useSelector } from "react-redux";

const BestSeller = () => {
  const { items: data } = useSelector((state) => state.bestSell);
  const [bestSeller, setBestSeller] = useState([]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="BEST " text2="SELLERS" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {/* Rendering Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {data?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
