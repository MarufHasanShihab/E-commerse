import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title/Title";
import { shopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem/ProductItem";
import { useSelector } from "react-redux";

const Collections = () => {
  const product = useSelector((state) => state.products.items);
  const category = useSelector((state) => state.category.items);

  const [showFilter, setShowFilter] = useState(false);
  const { search, showSearch } = useContext(shopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // ক্যাটাগরি টগল ফাংশন (সিলেক্টেড ক্যাটাগরি আপডেট)
  const toggleCategory = (e) => {
    const value = e.target.value;
    setSelectedCategory((prev) => {
      const updatedCategories = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      return updatedCategories;
    });
  };

  // পণ্য ফিল্টার ফাংশন
  const applyFilter = () => {
    let productCopy = [...product];

    // সার্চ ফিল্টার
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ক্যাটাগরি ফিল্টার (শুধুমাত্র নির্বাচিত ক্যাটাগরি অনুযায়ী ফিল্টার হবে)
    if (selectedCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        selectedCategory.includes(item.category)
      );
    }

    setFilterProducts(productCopy);
  };

  // পণ্য সোর্ট ফাংশন
  const sortProduct = () => {
    let fCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // ক্যাটাগরি, সার্চ বা ফিল্টার পরিবর্তন হলে পুনরায় ফিল্টার প্রয়োগ করবো
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, selectedCategory]);

  // সোর্ট টাইপ পরিবর্তন হলে সোর্ট অ্যাপ্লাই করবো
  useEffect(() => {
    sortProduct();
  }, [sortType]);

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
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <h3 className="mb-3 text-sm font-medium">CATEGORIES</h3>
          {category?.map((item, index) => (
            <p key={index} className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={item.name}
                onChange={toggleCategory}
              />{" "}
              {item.name.substring(0, 20)}..
            </p>
          ))}
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
          {product?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
