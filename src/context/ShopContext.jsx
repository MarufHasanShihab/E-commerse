import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";



export const shopContext = createContext();
const ShopProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});


  const addToCart = async (itemId,sizes, size) => {
    if (sizes) {
      if (!size) {
        toast.error('Please Select Product Size');
        return;
      }
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount =  () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          try {
            totalCount += cartItems[items][item];
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData = [itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount =  () => {
    let totalAmout = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (let item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmout += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {console.log(err)}
      }
    }
    return totalAmout;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };
  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

ShopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopProvider;
