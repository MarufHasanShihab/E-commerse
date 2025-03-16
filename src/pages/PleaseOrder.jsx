import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal/CartTotal";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";


const PleaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const navigate = useNavigate()
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
            {/* left side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1="DELIVERY" text2="INFORMATION"/>
                </div>
                <div className="flex gap-3">
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" required />
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" required />
                </div>
                <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="emain" placeholder="Email address" required />
                <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" required />
                <div className="flex gap-3">
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" required />
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" required />
                </div>
                <div className="flex gap-3">
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" required />
                    <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" required />
                </div>
                <input  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" required />
            </div>
            {/* Right Side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal/>
                </div>
                <div className="mt-12">
                    <Title text1="PAYMENT" text2="METHOD"/>
                    {/* Payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={()=>setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={()=>setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>
                </div>
                <div className="w-full text-end mt-8">
                <button onClick={()=>navigate("/order")} className="bg-black text-white text-sm my-8 px-16 py-3">
              PLEASE ORDER
            </button>
                </div>
            </div>
        </div>
    );
};

export default PleaceOrder;