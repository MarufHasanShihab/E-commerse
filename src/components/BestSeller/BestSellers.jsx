import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Title from "../Title/Title";
import { shopContext } from "../../context/ShopContext";

const BestSeller = () => {
    const {products}= useContext(shopContext);
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(()=>{
        const bestProducts = products.filter(product => product.bestseller);
        setBestSeller(bestProducts)
    },[products])
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
      {
        bestSeller?.map(product => <ProductItem key={product._id} product={product}/>)
      }
      </div>
    </div>
  );
};

export default BestSeller;
