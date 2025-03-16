import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react";
import { shopContext } from "../../context/ShopContext";
import ProductItem from "../ProductItem/ProductItem";
import Title from "../Title/Title"


const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(shopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(()=>{
        if(products.length > 0){
            const related = products?.filter(product => product.category === category && product.subCategory === subCategory);
            setRelatedProducts(related.slice(0,5))
        }
    },[category, subCategory, products])
    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
            <Title text1="RELATED" text2="PRODUCTS"/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {
                relatedProducts?.map(product => <ProductItem key={product._id} product={product}/>)
            }
        </div>
        </div>
    );

};
RelatedProducts.propTypes = {
    category: PropTypes.string,
    subCategory: PropTypes.string
}

export default RelatedProducts;