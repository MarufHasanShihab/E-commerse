import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { shopContext } from "../../context/ShopContext";
const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(shopContext);
    const navigate = useNavigate();;
    const handleSearch = () => {
        navigate("/collections")
        setShowSearch((prev) => !prev);
    }
    return (
        <div className="flex justify-between items-center py-5 font-medium">
            <Link className="text-2xl" to="/">LOGO</Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/collections" className="flex flex-col items-center gap-1">
                    <p>PRODUCTS</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/CONTACT" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>
            <div className="flex items-center gap-6"> 
                <img onClick={()=>handleSearch()} src={assets.search_icon} alt="search_icon" className="w-5 cursor-pointer" />
                <div className="group relative">
                <Link to="/login"><img src={assets.profile_icon} alt="search_icon" className="w-5 cursor-pointer" /></Link>
                </div>
                <Link to="/cart" className="relative">
                <img src={assets.cart_icon} alt="search_icon" className="w-5 min-w-5" />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </Link>
                <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="menu_icon" className=" w-5 cursor-pointer sm:hidden"/>
            </div>
            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full": "w-0"}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={()=>setVisible(false)} className="flex items-center gap-3 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} alt="dropdown_icon" className="h-4 rotate-180" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className="py-3 pl-6 border" to="/">HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className="py-3 pl-6 border" to="/collections">COLLECTIONS</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className="py-3 pl-6 border" to="/about">ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className="py-3 pl-6 border" to="/contact">CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;