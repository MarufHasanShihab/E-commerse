import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";


const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const onSubmitHandler = async(e)=>{
        e.preventDefault()
    }
    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="prata-regular text-3xl">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
            </div>
            {currentState === "Sign Up" && <input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required/>}
            <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required/>
            <div className="relative w-full">
            <input type={visiblePassword ? "text" : "password"} className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required/>
            <div onClick={()=>setVisiblePassword(!visiblePassword)} className="absolute right-4 top-2.5 text-[20px] cursor-pointer">{visiblePassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />
            }</div>
            </div>
            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forget your password?</p>
                {
                    currentState === "Login" ? <p onClick={()=>setCurrentState("Sign Up")} className="cursor-pointer">Create account</p> : <p onClick={()=>setCurrentState("Login")} className="cursor-pointer">Login Here</p>
                }

            </div>
            <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
        </form>
    );
};

export default Login;