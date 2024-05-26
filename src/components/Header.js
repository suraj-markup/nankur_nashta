import { LOGO_URL } from "../utils/constant";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = ()=>{
    const onlineStatus = useOnlineStatus();
    const [btnName,setBtnName] = useState("LogIn");

    return (  
      <div className="flex justify-between border-neutral-950 border-2  shadow-3xl bg-red-100">
        <div className="flex justify-center items-center">
          <img src={LOGO_URL} className="m-2 w-20 h-20"></img>
        </div>
  
        <div className="nav-menu">
          <ul className="flex justify-between text-base">
            <li className="p-4 mt-4 list-none">Online Status: {onlineStatus?"✅":"🔴"}</li>
            <li className="p-4 mt-4 list-none"><Link to="/" >Home 🏠</Link></li>
            <li className="p-4 mt-4 list-none"><Link to="/about">About Us 📄</Link></li>
            <li className="p-4 mt-4 list-none"><Link to="/contact">Contact Us ☎️</Link></li>
            
            <li className="p-4 mt-4 list-none">Cart 🛒</li>
            <li className="p-4 mt-4 list-none"><button className="cursor-pointer px-[20px] border-2 border-neutral-600 bg-neutral-50 hover:bg-red-100" onClick={()=>{btnName==="LogIn"?setBtnName("LogOut"):setBtnName("LogIn")}}>{btnName}</button></li>
          </ul> 
  
        </div>
  
      </div>
    )
  }

  export default Header;
