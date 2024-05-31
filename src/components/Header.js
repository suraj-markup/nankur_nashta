import { LOGO_URL } from "../utils/constant";
import UserContext from "../utils/UserContext";
import { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = ()=>{
    const onlineStatus = useOnlineStatus();
    const [btnName,setBtnName] = useState("LogIn");
    
    //subscribing to the cart
    const cartItems = useSelector((state) => state.cart.items);
    // console.log(cartItems);
   
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
            
            <li className="p-4 mt-4 list-none"> <Link to="/cart">Cart - ({cartItems.length} items) 🛒</Link></li>
            <li className="p-4 mt-4 list-none"><button className="cursor-pointer px-[20px] border-2 border-neutral-600 bg-neutral-50 hover:bg-red-100" onClick={()=>{btnName==="LogIn"?setBtnName("LogOut"):setBtnName("LogIn")}}>{btnName}</button></li>
            {/* <li className="p-4 mt-4 font-bold list-none"> 
            <UserContext.Consumer>
            {context => (
                <div>
                    <p>Logged in user: {context?.loggedInUser || 'No user logged in'}</p>
                </div>
            )}
        </UserContext.Consumer>
        </li> */}

          </ul> 
  
        </div>
  
      </div>
    )
  }

  export default Header;
