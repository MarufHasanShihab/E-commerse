import { useContext, useEffect, useState } from "react";
import { shopContext } from "../../context/ShopContext";
import { assets } from "../../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";


const Searchbar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(shopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname.includes('collections')){
            setVisible(true);
        }else{
            setVisible(false)
        }
    },[location])
    return showSearch && visible && (
        <div className="border-b bg-gray-50 mb-2 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm " type="text" placeholder="Search" />
                <img src={assets.search_icon} alt="search_icon" className="w-4" />
            </div>
            <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="cross_icon" className="inline w-3 cursor-pointer" />
        </div>
    );
};

export default Searchbar;