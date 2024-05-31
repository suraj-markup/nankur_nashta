import { LOGO_URL } from "../utils/constant";
import UserContext from "../utils/UserContext";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const [btnName, setBtnName] = useState("LogIn");

  // subscribing to the cart
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="flex flex-wrap justify-between items-center border-neutral-950 border-2 shadow-3xl bg-red-100 p-2  text-center">
      <div className="flex justify-center items-center w-full sm:w-auto">
        <img src={LOGO_URL} className="m-2 w-16 h-16 sm:w-20 sm:h-20" alt="Logo" />
      </div>

      <div className="nav-menu w-full sm:w-auto">
        <ul className="flex flex-col sm:flex-row justify-between text-base">
          <li className="p-2  list-none">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="p-2  list-none"><Link to="/">Home 🏠</Link></li>
          <li className="p-2  list-none"><Link to="/about">About Us 📄</Link></li>
          <li className="p-2  list-none"><Link to="/contact">Contact Us ☎️</Link></li>
          <li className="p-2  list-none"><Link to="/cart">Cart - ({cartItems.length} items) 🛒</Link></li>
          <li className="p-2  list-none">
            <button
              className="cursor-pointer px-4 border-2 border-neutral-600 bg-neutral-50 hover:bg-red-100"
              onClick={() => { btnName === "LogIn" ? setBtnName("LogOut") : setBtnName("LogIn"); }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
