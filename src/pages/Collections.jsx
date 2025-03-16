import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title/Title"
import { shopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem/ProductItem";


const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCaqtegory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const toggleCategory = e =>{
    if(category.includes(e.target.value)){
      setCaqtegory( prev => prev.filter(item => item !== e.target.value))
    }else{
      setCaqtegory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = ()=>{
    let productCopy = [...products];
    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    
    setFilterProducts(productCopy);
  }

  const sortProduct = ()=>{
    let fCopy = [...filterProducts];
    switch(sortType){
      case "low-high" :
      setFilterProducts(fCopy.sort((a,b)=> (a.price - b.price)))
      break;
      case "high-low" :
        setFilterProducts(fCopy.sort((a,b)=> (b.price - a.price)))
        break;
        default:
          applyFilter()
          break;
    }
  }
 
  useEffect(()=>{
    applyFilter();
  },[category, search, showSearch]);
  useEffect(()=>{
    sortProduct()
  },[sortType])
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <h3 className="mb-3 text-sm font-medium">CATEGORIES</h3>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={'Fashion'}
              onChange={toggleCategory}
            />{' '}
            Fashion
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={'Gadget'}
              onChange={toggleCategory}
            />{' '}
            Gadget
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={'Jewellery'}
              onChange={toggleCategory}
            />{' '}
            Jewellery
          </p>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl my-2">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-3"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
