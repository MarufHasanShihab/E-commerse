import PropTypes from "prop-types"
import { useContext } from "react";
import { shopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";


const ProductItem = ({product}) => {
    const {_id, image, name, price} = product || {};
    const {currency} = useContext(shopContext)
    return (
      <Link to={`/product/${_id}`} className="text-gray-700 cursor-pointer">
        <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
          <img
            src={image[0]}
            alt={name}
            className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
            <img
              className="h-3 w-3"
              src={assets.heart_icon}
              alt="heart_icon"
            />
          </button>
        </div>

        <p className="md:text-base font-medium pt-2 w-full truncate">
          {product.name}
        </p>
        <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xs">{4.5}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                className="h-3 w-3"
                src={
                  index < Math.floor(4)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star_icon"
              />
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between w-full mt-1">
          <p className="text-base font-medium">
            {currency}
            {price}
          </p>
          <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
            Buy now
          </button>
        </div>
      </Link>
    );
};

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItem;